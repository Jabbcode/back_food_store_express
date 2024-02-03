import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./category.entity";
import { Unit } from "./unit.entity";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn({ name: "ID_PRODUCT" })
  id_product!: number;

  @Column({ name: "NAME", nullable: false, length: 30 })
  name!: string;

  @Column({
    name: "PRICE",
    type: "float",
    precision: 5,
    scale: 2,
    nullable: false,
  })
  price!: number;

  @Column({
    name: "CREATION_DATE",
    type: "date",
    default: () => "CURRENT_TIMESTAMP",
  })
  creation_date!: Date;

  @OneToMany(() => Category, (category) => category.id_category, {
    cascade: true,
  })
  @JoinColumn({ name: "ID_CATEGORY" })
  categories!: Category[]; //TODO: Agregar la relacion correcta para tener multiples categorias en un producto

  @ManyToOne(() => Unit, (unit) => unit.id_unit, {
    cascade: true,
  })
  @JoinColumn({ name: "ID_UNIT" })
  unit!: Unit;
}
