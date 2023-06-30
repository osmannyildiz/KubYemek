import * as controller from "@/controllers/admins";
import express from "express";

export const adminsRouter = express.Router();

adminsRouter.route("/register").post(controller.registerAdmin);
// adminsRouter.route("/login").post(controller.loginAdmin);
// adminsRouter.route("/:adminId/password").put(controller.changeAdminPassword);
