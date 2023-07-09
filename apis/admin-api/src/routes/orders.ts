import * as controller from "@/controllers/orders";
import express from "express";

export const ordersRouter = express.Router();

ordersRouter.route("/").get(controller.getOrders);

ordersRouter.route("/:orderId").delete(controller.cancelOrder);
