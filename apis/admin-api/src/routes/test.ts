import express from "express";
import * as controller from "../controllers/test";

export const testRouter = express.Router();

testRouter.route("/").get(controller.getIndex);
