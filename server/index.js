import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import AuthRoutes from "./Routes/AuthRoutes.js"
import SweetRoutes from "./Routes/SweetRoutes.js"
import fileUpload from "express-fileupload";
import CartRoutes from "./Routes/CartRoutes.js"
import PurchaseRoutes from "./Routes/PurchaseRoutes.js"


dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({
    origin: [process.env.ORIGIN], // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If using cookies/auth headers
}))

const DBconnection = async () => {
    await mongoose.connect(process.env.MONGO_URL);
}

DBconnection().then(() =>{
    console.log("Connected to DB");
}).catch((e) =>{
    console.log(e);
})

app.listen(port,() => {
    console.log(`App is Listening on ${port}`);
})

 


app.use("/api/auth",AuthRoutes);
app.use("/api/sweets",SweetRoutes);
app.use("/api/cart",CartRoutes);
app.use("/api/purchase",PurchaseRoutes);
