import express from "express";
import { adminsRouter } from "./admins";
import { productsRouter } from "./products";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/admins", adminsRouter);
router.use("/products", productsRouter);
router.use("/test", testRouter);
