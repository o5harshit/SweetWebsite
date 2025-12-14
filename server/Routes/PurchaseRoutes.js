import { purchaseCart } from "../Controllers/PurchaseController.js";
import { verifyToken } from "../Middleware/AuthMiddleware.js";
import express from "express";

const PurchaseRoutes = express.Router();

PurchaseRoutes.post("/BuyItem", verifyToken,purchaseCart);


export default PurchaseRoutes;
