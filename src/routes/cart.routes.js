import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addProductToCart,getProductFromCart,updateQuantity,removeProduct } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", protectRoute, addProductToCart);
router.put("/", protectRoute, updateQuantity);
router.get("/:userId", protectRoute, getProductFromCart);removeProduct
router.delete("/", protectRoute, removeProduct);
export default router;
