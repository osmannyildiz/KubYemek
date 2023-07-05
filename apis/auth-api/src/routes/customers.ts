import * as controller from "@/controllers/customers";
import { authAllowOnly } from "@core/apis/middlewares/authAllowOnly";
import { UserType } from "@core/common/models/auth";
import express from "express";

export const customersRouter = express.Router();

customersRouter.route("/register").post(controller.registerCustomer);

customersRouter.route("/login").post(controller.loginCustomer);

customersRouter
	.route("/me/password")
	.put(authAllowOnly(UserType.customer), controller.changeCustomerPassword);
