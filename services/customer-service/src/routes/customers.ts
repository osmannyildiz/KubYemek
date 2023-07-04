import * as controller from "@/controllers/customers";
import { UserType } from "@core/common/models/auth";
import { authAllowOnly } from "@core/services/middlewares/authAllowOnly";
import express from "express";

export const customersRouter = express.Router();

customersRouter
	.route("/")
	.get(authAllowOnly(UserType.admin), controller.getCustomers)
	.post(authAllowOnly(UserType.admin), controller.addCustomer);

customersRouter.route("/byEmail").get(controller.getCustomerByEmail); // Used for login by auth-api

customersRouter
	.route("/:customerId")
	.get(authAllowOnly(UserType.admin), controller.getCustomer)
	.patch(authAllowOnly(UserType.admin), controller.updateCustomer)
	.delete(authAllowOnly(UserType.admin), controller.deleteCustomer);

customersRouter
	.route("/:customerId/points")
	.post(authAllowOnly(UserType.admin), controller.addToCustomerPoints);
