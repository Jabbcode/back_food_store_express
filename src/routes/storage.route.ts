import { Router } from "express";
import {
  createStorage,
  getOneStorage,
  getStorages,
  updateStorage,
  deleteStorage,
} from "../controllers/storage.controller";

const router = Router();

router.get("/", getStorages);

router.post("/", createStorage);

router.get("/:id", getOneStorage);

router.patch("/:id", updateStorage);

router.delete("/:id", deleteStorage);

export default router;
