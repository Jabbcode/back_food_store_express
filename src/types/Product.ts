import { ICategory } from "./Category";
import { IUnit } from "./Unit";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  unit: IUnit;
  categories: ICategory[];
  createdAt: Date;
  updateAt: Date;
}
