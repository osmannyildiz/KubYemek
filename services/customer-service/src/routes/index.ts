import express from "express";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/test", testRouter);
