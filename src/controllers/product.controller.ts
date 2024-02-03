import { Response, Request } from "express";
import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from "../services/product.service";
import { IProduct } from "../types/Product";

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  let categoryId = parseInt(req.query.category as string) || undefined;

  const skip = (page - 1) * limit;
  let products: any = [];

  try {
    !categoryId
      ? (products = await findAll(skip, limit))
      : (products = await findAll(skip, limit, categoryId));

    return res.json({
      products,
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

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, categories, unit } = req.body;

  if (!name || !price || !categories || !unit) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }

  try {
    const product = await create(req.body);

    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await findOne(id);

    if (!product) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe producto con el ${id}`,
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await findOne(id);

    if (!product) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe product con el ${id}`,
      });
    }
    await update(id, req.body);
    return res.status(200).json({ msg: "Producto actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await findOne(id);

    if (!product) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe producto con el ${id}`,
      });
    }
    await remove(id);

    return res.status(200).json({
      message: "El producto fue eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};
