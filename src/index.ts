import express from "express";
import cors from "cors";

import routeStorage from "./routes/storage.route";
import routeProduct from "./routes/product.route";
import routeCategory from "./routes/category.route";
import routeUnit from "./routes/unit.route";

import { SERVER_PORT } from "./config/const";
import { ConfigPrisma } from "./config/prisma";

ConfigPrisma();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/storage", routeStorage);
app.use("/api/v1/products", routeProduct);
app.use("/api/v1/categories", routeCategory);
app.use("/api/v1/units", routeUnit);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on Port ${SERVER_PORT}`);
});
