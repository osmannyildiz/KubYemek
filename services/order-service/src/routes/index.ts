import express from "express";
import { ordersRouter } from "./orders";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/orders", ordersRouter);
router.use("/test", testRouter);
