import * as controller from "@/controllers/orders";
import { UserType } from "@core/common/models/auth";
import { authAllowOnly } from "@core/services/middlewares/authAllowOnly";
import express from "express";

export const ordersRouter = express.Router();

ordersRouter
	.route("/")
	.get(authAllowOnly(UserType.admin, UserType.customer), controller.getOrders)
	.post(authAllowOnly(UserType.customer), controller.addOrder);

ordersRouter
	.route("/dto")
	.get(
		authAllowOnly(UserType.admin, UserType.customer),
		controller.getOrderDtos
	);

ordersRouter
	.route("/:orderId")
	.get(authAllowOnly(UserType.admin, UserType.customer), controller.getOrder)
	.delete(
		authAllowOnly(UserType.admin, UserType.customer),
		controller.cancelOrder
	);

ordersRouter
	.route("/:orderId/dto")
	.get(
		authAllowOnly(UserType.admin, UserType.customer),
		controller.getOrderDto
	);
