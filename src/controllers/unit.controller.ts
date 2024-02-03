import { Response, Request } from "express";
import {
  findAll,
  create,
  findOne,
  remove,
  update,
} from "../services/unit.service";

export const getUnits = async (req: Request, res: Response) => {
  try {
    const units = await findAll();

    return res.status(200).json(units);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const createUnit = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }

  try {
    const unit = await create(req.body);

    return res.status(201).json(unit);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const getOneUnit = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const unit = await findOne(id);

    if (!unit) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe unidad con el ${id}`,
      });
    }

    return res.status(200).json(unit);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const updateUnit = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const unit = await findOne(id);

    if (!unit) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe unit con el ${id}`,
      });
    }

    await update(id, req.body);

    return res.status(200).json({ msg: "Unidad actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const unit = await findOne(id);

    if (!unit) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe unidad con el ${id}`,
      });
    }

    await remove(id);

    return res.status(200).json({
      message: "La unidad fue eliminada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};
