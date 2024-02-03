import { prisma } from "../config/prisma";
import { ICategory } from "../types/Category";

export const findAll = async () => {
  return await prisma.category.findMany();
};

export const create = async (body: ICategory) => {
  return await prisma.category.create({
    data: {
      name: body.name,
    },
  });
};

export const findOne = async (id: string) => {
  return await prisma.category.findFirst({
    where: { id: parseInt(id) },
  });
};

export const update = async (id: string, body: ICategory) => {
  return await prisma.category.update({
    where: { id: parseInt(id) },
    data: {
      ...body,
    },
  });
};

export const remove = async (id: string) => {
  return await prisma.category.delete({
    where: { id: parseInt(id) },
  });
};
