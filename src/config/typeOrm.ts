import { DataSource } from "typeorm";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } from "./const";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { Unit } from "../entities/unit.entity";
import { Storage } from "../entities/storage.entity";

export const Connection = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: parseInt(process.env.DB_HOST || "3306"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Storage, Product, Category, Unit],
  synchronize: true,
});

Connection.initialize()
  .then(async () => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
