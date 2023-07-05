import express from "express";
import { adminsRouter } from "./admins";
import { customersRouter } from "./customers";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/admins", adminsRouter);
router.use("/customers", customersRouter);
router.use("/test", testRouter);
