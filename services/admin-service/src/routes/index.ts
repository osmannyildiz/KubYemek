import { UserType } from "@core/common/models/auth";
import { authAllowOnly } from "@core/services/middlewares/authAllowOnly";
import express from "express";
import { adminsRouter } from "./admins";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/admins", authAllowOnly(UserType.admin), adminsRouter);
router.use("/test", testRouter);
