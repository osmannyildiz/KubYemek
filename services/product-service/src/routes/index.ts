import express from "express";
import { productsRouter } from "./products";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/products", productsRouter);
router.use("/test", testRouter);
