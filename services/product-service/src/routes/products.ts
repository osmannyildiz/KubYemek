import * as controller from "@/controllers/products";
import { uploadProductImageToS3 } from "@/middlewares/uploadProductImageToS3";
import { UserType } from "@core/common/models/auth";
import { authAllowOnly } from "@core/services/middlewares/authAllowOnly";
import express from "express";

export const productsRouter = express.Router();

productsRouter
	.route("/")
	.get(controller.getProducts) // Allow without login
	.post(
		authAllowOnly(UserType.admin),
		uploadProductImageToS3.single("image"),
		controller.addProduct
	);

productsRouter
	.route("/:productId")
	.get(controller.getProduct) // Allow without login
	.patch(
		authAllowOnly(UserType.admin),
		uploadProductImageToS3.single("image"),
		controller.updateProduct
	)
	.delete(authAllowOnly(UserType.admin), controller.deleteProduct);

productsRouter
	.route("/:productId/produce")
	.post(authAllowOnly(UserType.admin), controller.produceProduct);
