import * as controller from "@/controllers/customers";
import { UserType } from "@core/common/models/auth";
import { authAllowOnly } from "@core/services/middlewares/authAllowOnly";
import express from "express";

export const customersRouter = express.Router();

customersRouter
	.route("/")
	.get(authAllowOnly(UserType.admin), controller.getCustomers)
	.post(controller.addCustomer); // Used for register by auth-api

customersRouter.route("/byEmail").get(controller.getCustomerByEmail); // Used for login by auth-api

customersRouter
	.route("/:customerId")
	.get(authAllowOnly(UserType.admin, UserType.customer), controller.getCustomer)
	.patch(
		authAllowOnly(UserType.admin, UserType.customer),
		controller.updateCustomer
	)
	.delete(
		authAllowOnly(UserType.admin, UserType.customer),
		controller.deleteCustomer
	);

customersRouter
	.route("/:customerId/points")
	.post(
		authAllowOnly(UserType.admin, UserType.customer),
		controller.addToCustomerPoints
	);
