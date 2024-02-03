import { prisma } from "../config/prisma";
import { IProduct } from "../types/Product";

export const findAll = async (
  skip: number,
  limit: number,
  categoryId: number | undefined = undefined
) => {
  return await prisma.product.findMany({
    where: {
      categories: {
        some: {
          category: {
            id: categoryId,
          },
        },
      },
    },
    skip,
    take: limit,
    orderBy: { name: "asc" },
    include: {
      unit: true,
      categories: {
        select: {
          category: true,
        },
      },
    },
  });
};

export const create = async (body: IProduct) => {
  return await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      createdAt: new Date(),
      updateAt: new Date(),
      unitId: body?.unit?.id!,
      categories: {
        createMany: {
          data: body?.categories?.map((category) => ({
            categoryId: category.id,
            assignedAt: new Date(),
          })),
        },
      },
    },
  });
};

export const findOne = async (id: string) => {
  return await prisma.product.findFirst({
    where: { id: parseInt(id) },
    include: {
      unit: true,
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
};

export const update = async (id: string, body: IProduct) => {
  return await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: body.name,
      price: body.price,
      unit: {
        connect: {
          id: body?.unit?.id,
        },
      },
      categories: {
        createMany: {
          data: body?.categories?.map((category) => ({
            categoryId: category.id,
            assignedAt: new Date(),
          })),
        },
      },
      updateAt: new Date(),
    },
  });
};

export const remove = async (id: string) => {
  return await prisma.product.delete({
    where: { id: parseInt(id) },
  });
};
