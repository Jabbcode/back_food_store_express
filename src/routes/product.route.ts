import { Router } from "express";
import {
  createProduct,
  getOneProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/:id", getOneProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
