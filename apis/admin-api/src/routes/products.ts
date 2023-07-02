import * as controller from "@/controllers/products";
import { uploadInMemory } from "@/middlewares/uploadInMemory";
import express from "express";

export const productsRouter = express.Router();

productsRouter
	.route("/")
	.get(controller.getProducts)
	.post(uploadInMemory.single("image"), controller.addProduct);

productsRouter
	.route("/:productId")
	// .get(controller.getProduct)
	.patch(uploadInMemory.single("image"), controller.updateProduct)
	.delete(controller.deleteProduct);

productsRouter.route("/:productId/produce").post(controller.produceProduct);
