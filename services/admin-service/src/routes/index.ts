import express from "express";
import { adminsRouter } from "./admins";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/admins", adminsRouter);
router.use("/test", testRouter);
