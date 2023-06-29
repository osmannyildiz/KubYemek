import { db } from "@/db";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpInternalServerErrorResponse,
	HttpNotFoundResponse,
	HttpOkResponse,
} from "@core/common/models/httpResponse";
import { sendHttpResp } from "@core/common/utils";
import {
	ServiceAddProductRequestBody,
	ServiceUpdateProductRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceRequestHandler,
	ServiceRequestHandlerWithParams,
} from "@core/services/models/requestHandlers";
import {
	ServiceAddProductResponseBody,
	ServiceDeleteProductResponseBody,
	ServiceErrorResponseBody,
	ServiceGetProductResponseBody,
	ServiceGetProductsResponseBody,
	ServiceSuccessResponseBody,
	ServiceUpdateProductResponseBody,
} from "@core/services/models/responseBody";
import { generateSetClauseAndValuesForDbUpdate } from "@core/services/utils";
import slug from "slug";

export const getProducts: ServiceRequestHandler<
	null,
	ServiceGetProductsResponseBody
> = async (req, res) => {
	const productsRepo = db.products();

	const products = await productsRepo.getAll();
	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(products))
	);
};

export const addProduct: ServiceRequestHandler<
	ServiceAddProductRequestBody,
	ServiceAddProductResponseBody
> = async (req, res) => {
	const { name, unitOfSale, price, imageUrl } = req.body;
	const productsRepo = db.products();

	if (!name || !unitOfSale || !price) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	const productSlug = slug(name);

	try {
		await productsRepo.insert(name, productSlug, unitOfSale, price, imageUrl);
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ServiceErrorResponseBody(ErrorType.default)
			)
		);
	}

	return sendHttpResp(
		res,
		new HttpCreatedResponse(new ServiceSuccessResponseBody(undefined))
	);
};

export const getProduct: ServiceRequestHandlerWithParams<
	null,
	ServiceGetProductResponseBody,
	"productId"
> = async (req, res) => {
	const { productId } = req.params;
	const productsRepo = db.products();

	const product = await productsRepo.getById(+productId);
	if (!product) {
		return sendHttpResp(
			res,
			new HttpNotFoundResponse(new ServiceErrorResponseBody(ErrorType.notFound))
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(product))
	);
};

export const updateProduct: ServiceRequestHandlerWithParams<
	ServiceUpdateProductRequestBody,
	ServiceUpdateProductResponseBody,
	"productId"
> = async (req, res) => {
	const { productId } = req.params;
	const productsRepo = db.products();

	await productsRepo.update(
		...generateSetClauseAndValuesForDbUpdate(req.body),
		"id=?",
		[productId]
	);
	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(undefined))
	);
};

export const deleteProduct: ServiceRequestHandlerWithParams<
	null,
	ServiceDeleteProductResponseBody,
	"productId"
> = async (req, res) => {
	const { productId } = req.params;
	const productsRepo = db.products();

	await productsRepo.deleteById(+productId);
	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(undefined))
	);
};
