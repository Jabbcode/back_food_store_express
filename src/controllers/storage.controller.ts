import { Response, Request } from "express";
import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from "../services/storage.service";

export const getStorages = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  let isAvailable = req.query.isAvailable || undefined;

  const skip = (page - 1) * limit;
  let storages: any = [];

  try {
    isAvailable === undefined
      ? (storages = await findAll(skip, limit, isAvailable))
      : (storages = await findAll(skip, limit));

    return res.json({
      storages,
      paginaActual: page,
      limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const createStorage = async (req: Request, res: Response) => {
  const { quantity, isAvailable, product } = req.body;

  if (!quantity || !isAvailable || !product) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }
  try {
    const storage = await create(req.body);

    return res.status(201).json(storage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const getOneStorage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const storage = await findOne(id);

    if (!storage) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe informacion con el ${id}`,
      });
    }
    return res.status(200).json(storage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const updateStorage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const storage = await findOne(id);

    if (!storage) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe informacion con el ${id}`,
      });
    }
    await update(id, req.body);
    return res.status(200).json({ msg: "Item actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const deleteStorage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const storage = await findOne(id);

    if (!storage) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe informacion con el ${id}`,
      });
    }

    await remove(id);

    return res.status(200).json({
      message: "Item fue eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};
