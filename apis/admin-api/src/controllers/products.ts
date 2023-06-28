import { ProductAdapter } from "@/adapters/ProductAdapter";
import {
	ApiAddProductRequestBody,
	ApiUpdateProductRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiAddProductResponseBody,
	ApiDeleteProductResponseBody,
	ApiErrorResponseBody,
	ApiGetProductResponseBody,
	ApiGetProductsResponseBody,
	ApiSuccessResponseBody,
	ApiUpdateProductResponseBody,
} from "@core/apis/models/responseBody";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpInternalServerErrorResponse,
	HttpOkResponse,
} from "@core/common/models/httpResponse";
import { ProductServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";
import type { RequestHandler } from "express";

export const getProducts: RequestHandler<
	undefined,
	ApiGetProductsResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	let products;
	try {
		products = await ProductServiceClient.getProducts();
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(error.errorType || ErrorType.default)
			)
		);
	}

	products = products.map((p) => ProductAdapter.privateToPublic(p));

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(products))
	);
};

export const addProduct: RequestHandler<
	undefined,
	ApiAddProductResponseBody,
	ApiAddProductRequestBody,
	undefined
> = async (req, res) => {
	const { name, unitOfSale, price, imageUrl } = req.body;

	if (!name || !unitOfSale || !price) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ApiErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	try {
		await ProductServiceClient.addProduct({
			name,
			unitOfSale,
			price,
			imageUrl,
		});
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(error.errorType || ErrorType.default)
			)
		);
	}

	return sendHttpResp(
		res,
		new HttpCreatedResponse(new ApiSuccessResponseBody(undefined))
	);
};

export const getProduct: RequestHandler<
	{ productId: string },
	ApiGetProductResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	const { productId } = req.params;

	let product;
	try {
		product = await ProductServiceClient.getProduct(+productId);
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(error.errorType || ErrorType.default)
			)
		);
	}

	product = ProductAdapter.privateToPublic(product);

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(product))
	);
};

export const updateProduct: RequestHandler<
	{ productId: string },
	ApiUpdateProductResponseBody,
	ApiUpdateProductRequestBody,
	undefined
> = async (req, res) => {
	const { productId } = req.params;

	try {
		await ProductServiceClient.updateProduct(+productId, req.body);
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(error.errorType || ErrorType.default)
			)
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(undefined))
	);
};

export const deleteProduct: RequestHandler<
	{ productId: string },
	ApiDeleteProductResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	const { productId } = req.params;

	try {
		await ProductServiceClient.deleteProduct(+productId);
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(error.errorType || ErrorType.default)
			)
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(undefined))
	);
};
