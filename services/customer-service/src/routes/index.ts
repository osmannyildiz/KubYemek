import express from "express";
import { customersRouter } from "./customers";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/customers", customersRouter);
router.use("/test", testRouter);
