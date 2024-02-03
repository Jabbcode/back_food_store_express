import { Response, Request } from "express";
import { Connection } from "../config/typeOrm";
import { Product } from "../entities/product.entity";

const ProductRepository = Connection.getRepository(Product);

export const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const categoryId = parseInt(req.query.category as string) || undefined;

    const skip = (page - 1) * limit;

    let queryBuilder = ProductRepository.createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.unit", "unit")
      .skip(skip)
      .take(limit)
      .orderBy("product.name", "ASC");

    if (categoryId) {
      queryBuilder = queryBuilder.where("product.category = :categoryId", {
        categoryId,
      });
    }

    const [products, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return res.json({
      products,
      total,
      paginaActual: page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { name, price, creation_date, category, unit } = req.body;

  if (!name || !price || !creation_date || !category || !unit) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }

  try {
    const product = await ProductRepository.save({
      name,
      price,
      date: creation_date,
      category: { id_category: category },
      unit: { id_unit: unit },
    });

    return res.status(201).json(product);
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
    const product = await ProductRepository.createQueryBuilder("product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product.unit", "unit")
      .where("product.id_product = :id", { id: parseInt(id) })
      .getOne();

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

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await ProductRepository.findOneBy({
      id_product: parseInt(id),
    });

    if (!product) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe product con el ${id}`,
      });
    }

    await ProductRepository.update(
      { id_product: parseInt(id) },
      { ...req.body }
    );

    return res.status(200).json({ msg: "Producto actualizado correctamente" });
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
    const product = await ProductRepository.delete({
      id_product: parseInt(id),
    });

    if (!product) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe producto con el ${id}`,
      });
    }

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
