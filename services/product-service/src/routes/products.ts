import * as controller from "@/controllers/products";
import express from "express";

export const productsRouter = express.Router();

productsRouter
	.route("/")
	.get(controller.getProducts)
	.post(controller.addProduct);
productsRouter
	.route("/:productId")
	.get(controller.getProduct)
	.patch(controller.updateProduct)
	.delete(controller.deleteProduct);
