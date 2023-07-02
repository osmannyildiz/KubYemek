import * as controller from "@/controllers/admins";
import { authAllowOnly } from "@core/apis/middlewares/authAllowOnly";
import { UserType } from "@core/common/models/auth";
import express from "express";

export const adminsRouter = express.Router();

adminsRouter
	.route("/register")
	.post(authAllowOnly(UserType.admin), controller.registerAdmin);

adminsRouter.route("/login").post(controller.loginAdmin);

// adminsRouter.route(authAllowOnly(UserType.admin), "/:adminId/password").put(controller.changeAdminPassword);
