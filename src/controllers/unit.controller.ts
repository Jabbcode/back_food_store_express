import { Response, Request } from "express";
import { Connection } from "../config/typeOrm";
import { Unit } from "../entities/unit.entity";

const UnitRepository = Connection.getRepository(Unit);

export const getAll = async (req: Request, res: Response) => {
  try {
    const units = await UnitRepository.find();

    return res.status(200).json(units);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }

  try {
    const unit = await UnitRepository.save({
      name,
      description,
    });

    return res.status(201).json(unit);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const unit = await UnitRepository.findOneBy({
      id_unit: parseInt(id),
    });

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

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const unit = await UnitRepository.findOneBy({
      id_unit: parseInt(id),
    });

    if (!unit) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe unit con el ${id}`,
      });
    }

    await UnitRepository.update({ id_unit: parseInt(id) }, { ...req.body });

    return res.status(200).json({ msg: "Unidad actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const unit = await UnitRepository.delete({
      id_unit: parseInt(id),
    });

    if (!unit) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe unidad con el ${id}`,
      });
    }

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
