import * as controller from "@/controllers/admins";
import express from "express";

export const adminsRouter = express.Router();

adminsRouter.route("/").get(controller.getAdmins).post(controller.addAdmin);
adminsRouter
	.route("/:adminId")
	.get(controller.getAdmin)
	.patch(controller.updateAdmin)
	.delete(controller.deleteAdmin);
