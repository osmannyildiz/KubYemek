import * as controller from "@/controllers/notifications";
import express from "express";

export const notificationsRouter = express.Router();

notificationsRouter.route("/").get(controller.getNotifications);
