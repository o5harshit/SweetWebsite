import { addToCart, getCart, removeCartItem, updateCartItem } from "../Controllers/CartConrollers.js";
import { verifyToken } from "../Middleware/AuthMiddleware.js";
import express from "express";

const CartRoutes = express.Router();

CartRoutes.post("/AddCart", verifyToken,addToCart);
CartRoutes.get("/GetCart", verifyToken,getCart);
CartRoutes.put("/UpdateCart/:itemId",verifyToken,updateCartItem);
CartRoutes.delete("/DeleteCartItem/:itemId",verifyToken,removeCartItem);

export default CartRoutes;
