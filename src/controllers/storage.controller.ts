import { Response, Request } from "express";
import { Connection } from "../config/typeOrm";
import { Storage } from "../entities/storage.entity";

const StorageRepository = Connection.getRepository(Storage);

export const getAll = async (req: Request, res: Response) => {
  try {
    const storage = await StorageRepository.find({
      relations: ["product"],
      where: { isAvailable: true },
    });

    return res.status(200).json(storage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Error en el servidor",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  const { quantity, isAvailable, product } = req.body;

  if (!quantity || !isAvailable || !product) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Faltan datos necesarios",
    });
  }

  try {
    const storage = await StorageRepository.save({
      quantity,
      isAvailable,
      product: { id_product: product },
    });

    return res.status(201).json(storage);
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
    const storage = await StorageRepository.createQueryBuilder("storage")
      .leftJoinAndSelect("storage.product", "product")
      .where("storage.id_storage = :id", { id: parseInt(id) })
      .getOne();

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

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const storage = await StorageRepository.findOneBy({
      id_storage: parseInt(id),
    });

    if (!storage) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe informacion con el ${id}`,
      });
    }

    await StorageRepository.update(
      { id_storage: parseInt(id) },
      { ...req.body }
    );

    return res.status(200).json({ msg: "Item actualizado correctamente" });
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
    const storage = await StorageRepository.delete({
      id_storage: parseInt(id),
    });

    if (!storage) {
      return res.status(400).json({
        status: "Bad Request",
        message: `No existe informacion con el ${id}`,
      });
    }

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
