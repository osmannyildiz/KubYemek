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
import { serviceRespBodyIsNotOk } from "@core/apis/utils";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpInternalServerErrorResponse,
	HttpOkResponse,
} from "@core/common/models/httpResponse";
import { sendHttpResp } from "@core/common/utils";
import {
	ServiceAddProductRequestBody,
	ServiceUpdateProductRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceAddProductResponseBody,
	ServiceDeleteProductResponseBody,
	ServiceGetProductResponseBody,
	ServiceGetProductsResponseBody,
	ServiceUpdateProductResponseBody,
} from "@core/services/models/responseBody";
import type { RequestHandler } from "express";
import fetch from "node-fetch";

export const getProducts: RequestHandler<
	undefined,
	ApiGetProductsResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	let products;
	try {
		const svcResp = await fetch("http://localhost:8001/products");
		const svcRespBody: ServiceGetProductsResponseBody = await svcResp.json();

		if (serviceRespBodyIsNotOk(svcRespBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(svcRespBody.errorType)
				)
			);
		}

		products = svcRespBody.data.map((a) => ProductAdapter.privateToPublic(a));
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(ErrorType.default)
			)
		);
	}

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
		const svcReqBody: ServiceAddProductRequestBody = {
			name,
			unitOfSale,
			price,
			imageUrl,
		};
		const svcResp = await fetch("http://localhost:8001/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(svcReqBody),
		});
		const svcRespBody: ServiceAddProductResponseBody = await svcResp.json();

		if (serviceRespBodyIsNotOk(svcRespBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(svcRespBody.errorType)
				)
			);
		}
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(ErrorType.default)
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
		const svcResp = await fetch(`http://localhost:8001/products/${productId}`);
		const svcRespBody: ServiceGetProductResponseBody = await svcResp.json();

		if (serviceRespBodyIsNotOk(svcRespBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(svcRespBody.errorType)
				)
			);
		}

		product = ProductAdapter.privateToPublic(svcRespBody.data);
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(ErrorType.default)
			)
		);
	}

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
		const svcReqBody: ServiceUpdateProductRequestBody = req.body;
		const svcResp = await fetch(`http://localhost:8001/products/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(svcReqBody),
		});
		const svcRespBody: ServiceUpdateProductResponseBody = await svcResp.json();

		if (serviceRespBodyIsNotOk(svcRespBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(svcRespBody.errorType)
				)
			);
		}
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(ErrorType.default)
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

	let product;
	try {
		const svcResp = await fetch(`http://localhost:8001/products/${productId}`, {
			method: "DELETE",
		});
		const svcRespBody: ServiceDeleteProductResponseBody = await svcResp.json();

		if (serviceRespBodyIsNotOk(svcRespBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(svcRespBody.errorType)
				)
			);
		}
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(ErrorType.default)
			)
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(undefined))
	);
};
