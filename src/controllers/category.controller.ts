import { Response, Request } from "express";
import { Connection } from "../config/typeOrm";
import { Category } from "../entities/category.entity";

const CategoryRepository = Connection.getRepository(Category);

export const getAll = async (req: Request, res: Response) => {
  try {
    const category = await CategoryRepository.find();

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }

  try {
    const category = await CategoryRepository.save({ name });

    return res.status(201).json(category);
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
    const category = await CategoryRepository.findOneBy({
      id_category: parseInt(id),
    });

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

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const product = await CategoryRepository.findOneBy({
      id_category: parseInt(id),
    });

    if (!product) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe categoria con el ${id}`,
      });
    }

    await CategoryRepository.update(
      { id_category: parseInt(id) },
      { ...req.body }
    );

    return res.status(200).json({ msg: "Categoria actualizada correctamente" });
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
    const product = await CategoryRepository.delete({
      id_category: parseInt(id),
    });

    if (!product) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe categoria con el ${id}`,
      });
    }

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
