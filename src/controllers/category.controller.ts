import { Response, Request } from "express";
import {
  findAll,
  create,
  findOne,
  update,
  remove,
} from "../services/category.service";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const category = await findAll();
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }

  try {
    const category = await create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const getOneCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await findOne(id);

    if (!category) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe categoria con el ${id}`,
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await findOne(id);

    if (!category) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe categoria con el ${id}`,
      });
    }
    await update(id, req.body);
    return res.status(200).json({ msg: "Categoria actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await findOne(id);

    if (!category) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe categoria con el ${id}`,
      });
    }
    await remove(id);

    return res.status(200).json({
      message: "La categoria fue eliminada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};
