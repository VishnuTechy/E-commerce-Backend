import express from "express";
import { getAllProducts,getProductById,editProduct,addProduct,deleteProduct } from "../controllers/product.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/byid/:id",protectRoute,  getProductById);
router.post("/",protectRoute,  addProduct);
router.put("/", protectRoute, editProduct);
router.delete("/:id",protectRoute, deleteProduct);
router.get("/all",protectRoute,  getAllProducts);

export default router;
