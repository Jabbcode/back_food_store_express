import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "units" })
export class Unit {
  @PrimaryGeneratedColumn({ name: "ID_UNIT" })
  id_unit!: number;

  @Column({ name: "NAME", nullable: false, length: 30 })
  name!: string;

  @Column({ name: "DESCRIPTION", nullable: false, length: 100 })
  description!: string;
}
