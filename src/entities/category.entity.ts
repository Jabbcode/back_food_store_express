import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "categories" })
export class Category {
  @PrimaryGeneratedColumn({ name: "ID_CATEGORY" })
  id_category!: number;

  @Column({ name: "NAME", nullable: false, length: 30 })
  name!: string;
}
