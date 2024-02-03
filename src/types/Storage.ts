import { IProduct } from "./Product";

export interface IStorage {
  id: number;
  quantity: number;
  isAvailable: boolean;
  product: IProduct;
}
