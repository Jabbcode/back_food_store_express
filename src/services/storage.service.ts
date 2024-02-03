import { prisma } from "../config/prisma";
import { IStorage } from "../types/Storage";

export const findAll = async (
  skip: number,
  limit: number,
  isAvailable: boolean | undefined = undefined
) => {
  return await prisma.storage.findMany({
    where: {
      isAvailable,
    },
    skip,
    take: limit,
    orderBy: {
      product: {
        name: "asc",
      },
    },
    select: {
      id: true,
      quantity: true,
      isAvailable: true,
      productId: false,
      product: true,
    },
  });
};

export const create = async (body: IStorage) => {
  return await prisma.storage.create({
    data: {
      quantity: body.quantity,
      isAvailable: body.isAvailable,
      productId: body.product.id,
    },
  });
};

export const findOne = async (id: string) => {
  return await prisma.storage.findFirst({
    where: { id: parseInt(id) },
    include: {
      product: true,
    },
  });
};

export const update = async (id: string, body: IStorage) => {
  return await prisma.storage.update({
    where: { id: parseInt(id) },
    data: {
      quantity: body.quantity,
      isAvailable: false,
      productId: body.product.id,
    },
  });
};

export const remove = async (id: string) => {
  return await prisma.storage.delete({
    where: { id: parseInt(id) },
  });
};
