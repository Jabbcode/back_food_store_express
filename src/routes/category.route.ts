import { Router } from "express";
import {
  create,
  getOne,
  getAll,
  update,
  deleteOne,
} from "../controllers/category.controller";

const router = Router();

router.get("/", getAll);

router.post("/", create);

router.get("/:id", getOne);

router.patch("/:id", update);

router.delete("/:id", deleteOne);

export default router;
