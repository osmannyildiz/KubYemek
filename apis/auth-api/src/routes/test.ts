import * as controller from "@/controllers/test";
import express from "express";

export const testRouter = express.Router();

testRouter.route("/").get(controller.getIndex);
