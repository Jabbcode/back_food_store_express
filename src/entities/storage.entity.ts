import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "storage" })
export class Storage {
  @PrimaryGeneratedColumn({ name: "ID_STORAGE" })
  id_storage!: number;

  @Column({ name: "QUANTITY", nullable: false })
  quantity!: number;

  @Column({ name: "ISAVAILABLE", type: "boolean", default: false })
  isAvailable!: Boolean;

  @ManyToOne(() => Product, (product) => product.id_product, {
    cascade: true,
  })
  @JoinColumn({ name: "ID_PRODUCT" })
  product!: Product;
}
