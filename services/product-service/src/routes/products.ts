import * as controller from "@/controllers/products";
import { uploadProductImageToS3 } from "@/middlewares/uploadProductImageToS3";
import express from "express";

export const productsRouter = express.Router();

productsRouter
	.route("/")
	.get(controller.getProducts)
	.post(uploadProductImageToS3.single("image"), controller.addProduct);
productsRouter
	.route("/:productId")
	.get(controller.getProduct)
	.patch(uploadProductImageToS3.single("image"), controller.updateProduct)
	.delete(controller.deleteProduct);
productsRouter.route("/:productId/produce").post(controller.produceProduct);
