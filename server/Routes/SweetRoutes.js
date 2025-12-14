import express from "express"
import { GetSweets, SearchSweets,DeleteSweets, addSweet,GetSweetsById, updateSweet } from "../Controllers/SweetControllers.js";
import { verifyToken } from "../Middleware/AuthMiddleware.js";



const SweetRoutes = express.Router();

SweetRoutes.post("/AddSweets",verifyToken,addSweet);
SweetRoutes.get("/GetSweets",verifyToken,GetSweets);
SweetRoutes.get("/GetById/:id",verifyToken,GetSweetsById);
SweetRoutes.put("/UpdateSweet/:id",verifyToken,updateSweet);
SweetRoutes.put("/SearchSweets",verifyToken,SearchSweets);
SweetRoutes.delete("/DeleteSweets/:id",verifyToken,DeleteSweets);




export default SweetRoutes;