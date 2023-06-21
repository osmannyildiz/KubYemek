import express from "express";
import * as controller from "../controllers/admins";

export const adminsRouter = express.Router();

adminsRouter.route("/").get(controller.getAdmins).post(controller.addAdmin);
adminsRouter
	.route("/:adminId")
	.get(controller.getAdmin)
	.patch(controller.updateAdmin)
	.delete(controller.deleteAdmin);
