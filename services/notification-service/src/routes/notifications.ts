import * as controller from "@/controllers/notifications";
import { UserType } from "@core/common/models/auth";
import { authAllowOnly } from "@core/services/middlewares/authAllowOnly";
import express from "express";

export const notificationsRouter = express.Router();

notificationsRouter
	.route("/admins/notifications")
	.get(authAllowOnly(UserType.admin), controller.getAdminNotifications)
	.post(controller.addAdminNotification);

notificationsRouter
	.route("/customers/:customerId/notifications")
	.get(
		authAllowOnly(UserType.admin, UserType.customer),
		controller.getCustomerNotifications
	)
	.post(controller.addCustomerNotification);
