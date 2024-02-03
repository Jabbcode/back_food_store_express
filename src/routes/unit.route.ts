import { Router } from "express";
import {
  createUnit,
  getOneUnit,
  getUnits,
  updateUnit,
  deleteUnit,
} from "../controllers/unit.controller";

const router = Router();

router.get("/", getUnits);

router.post("/", createUnit);

router.get("/:id", getOneUnit);

router.patch("/:id", updateUnit);

router.delete("/:id", deleteUnit);

export default router;
