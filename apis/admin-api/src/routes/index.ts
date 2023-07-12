import { authAllowOnly } from "@core/apis/middlewares/authAllowOnly";
import { UserType } from "@core/common/models/auth";
import express from "express";
import { adminsRouter } from "./admins";
import { customersRouter } from "./customers";
import { notificationsRouter } from "./notifications";
import { ordersRouter } from "./orders";
import { productsRouter } from "./products";
import { testRouter } from "./test";

export const router = express.Router();

router.use("/admins", authAllowOnly(UserType.admin), adminsRouter);
router.use("/customers", authAllowOnly(UserType.admin), customersRouter);
router.use(
	"/notifications",
	authAllowOnly(UserType.admin),
	notificationsRouter
);
router.use("/orders", authAllowOnly(UserType.admin), ordersRouter);
router.use("/products", authAllowOnly(UserType.admin), productsRouter);
router.use("/test", testRouter);
