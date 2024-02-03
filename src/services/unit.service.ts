import { prisma } from "../config/prisma";
import { IUnit } from "../types/Unit";

export const findAll = async () => {
  return await prisma.unit.findMany();
};

export const create = async (body: IUnit) => {
  return await prisma.unit.create({
    data: {
      name: body.name,
      description: body.description,
    },
  });
};

export const findOne = async (id: string) => {
  return await prisma.unit.findFirst({
    where: { id: parseInt(id) },
  });
};

export const update = async (id: string, body: IUnit) => {
  return await prisma.unit.update({
    where: { id: parseInt(id) },
    data: {
      ...body,
    },
  });
};

export const remove = async (id: string) => {
  return await prisma.unit.delete({
    where: { id: parseInt(id) },
  });
};
