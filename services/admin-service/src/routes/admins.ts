import * as controller from "@/controllers/admins";
import { UserType } from "@core/common/models/auth";
import { authAllowOnly } from "@core/services/middlewares/authAllowOnly";
import express from "express";

export const adminsRouter = express.Router();

adminsRouter
	.route("/")
	.get(authAllowOnly(UserType.admin), controller.getAdmins)
	.post(authAllowOnly(UserType.admin), controller.addAdmin);

adminsRouter.route("/byEmail").get(controller.getAdminByEmail); // Used for login by auth-api

adminsRouter
	.route("/:adminId")
	.get(authAllowOnly(UserType.admin), controller.getAdmin)
	.patch(authAllowOnly(UserType.admin), controller.updateAdmin)
	.delete(authAllowOnly(UserType.admin), controller.deleteAdmin);
