import * as controller from "@/controllers/customers";
import express from "express";

export const customersRouter = express.Router();

customersRouter.route("/").get(controller.getCustomers);

customersRouter
	.route("/:customerId/points")
	.post(controller.addToCustomerPoints);
