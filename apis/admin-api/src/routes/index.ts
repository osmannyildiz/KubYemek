import { authAllowOnly } from "@core/apis/middlewares/authAllowOnly";
import { UserType } from "@core/common/models/auth";
import express from "express";
import { adminsRouter } from "./admins";
import { productsRouter } from "./products";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/admins", authAllowOnly(UserType.admin), adminsRouter);
router.use("/products", authAllowOnly(UserType.admin), productsRouter);
router.use("/test", testRouter);
