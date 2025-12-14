import express from "express"
import { getUserInfo, login, Logout, signup } from "../Controllers/AuthControllers.js";
import { verifyToken } from "../Middleware/AuthMiddleware.js";


const AuthRoutes = express.Router();


AuthRoutes.post("/signup",signup);
AuthRoutes.post("/login",login);
AuthRoutes.get("/logout",Logout);
AuthRoutes.get("/user-info",verifyToken,getUserInfo);


export default AuthRoutes;