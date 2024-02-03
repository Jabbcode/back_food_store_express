import { Router } from "express";
import {
  createCategory,
  getCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

const router = Router();

router.get("/", getCategories);

router.post("/", createCategory);

router.get("/:id", getOneCategory);

router.patch("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
