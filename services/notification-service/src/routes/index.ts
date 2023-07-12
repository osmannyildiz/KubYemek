import express from "express";
import { notificationsRouter } from "./notifications";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/", notificationsRouter);
router.use("/test", testRouter);
