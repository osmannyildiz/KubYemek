import { db } from "@/db";
import { incrementSlug } from "@/utils";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpInternalServerErrorResponse,
	HttpNotFoundResponse,
	HttpOkResponse,
} from "@core/common/models/httpResponse";
import { sendHttpResp, waitForMs } from "@core/common/utils";
import {
	ServiceAddProductRequestBody,
	ServiceProduceProductRequestBody,
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
	ServiceProduceProductResponseBody,
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

	let products;
	try {
		products = await productsRepo.getAll();
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
		new HttpOkResponse(new ServiceSuccessResponseBody(products))
	);
};

export const addProduct: ServiceRequestHandler<
	ServiceAddProductRequestBody,
	ServiceAddProductResponseBody
> = async (req, res) => {
	const { name, unitOfSale, price } = req.body;
	const productsRepo = db.products();

	if (!name || !unitOfSale || !price) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	let imageUrl;
	if (req.file) {
		const file = req.file as Express.MulterS3.File;
		imageUrl = file.location;
	} else {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	let productSlug = slug(name);
	let loopCounter = 0;
	while (true) {
		let existingProduct;
		try {
			existingProduct = await productsRepo.getOne("slug = ?", [productSlug]);
		} catch (error) {
			console.error(error);
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ServiceErrorResponseBody(ErrorType.default)
				)
			);
		}

		if (existingProduct) {
			productSlug = incrementSlug(productSlug);
		} else {
			// Found an unused slug
			break;
		}

		loopCounter++;
		if (loopCounter > 1000) {
			throw new Error("Slug increment loop couldn't exit in 1000 iterations.");
		}
	}

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

	let product;
	try {
		product = await productsRepo.getById(+productId);
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ServiceErrorResponseBody(ErrorType.default)
			)
		);
	}
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

	const updates: ServiceUpdateProductRequestBody & { imageUrl?: string } =
		req.body;

	if (req.file) {
		const file = req.file as Express.MulterS3.File;
		updates.imageUrl = file.location;
	}

	try {
		await productsRepo.update(
			...generateSetClauseAndValuesForDbUpdate(updates),
			"id = ?",
			[productId]
		);
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

	try {
		await productsRepo.deleteById(+productId);
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
		new HttpOkResponse(new ServiceSuccessResponseBody(undefined))
	);
};

export const produceProduct: ServiceRequestHandlerWithParams<
	ServiceProduceProductRequestBody,
	ServiceProduceProductResponseBody,
	"productId"
> = async (req, res) => {
	const { productId } = req.params;
	const { unitsCount } = req.body;
	const productsRepo = db.products();

	if (!unitsCount) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	if (unitsCount < 1) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.fieldMustBeOneOrBigger)
			)
		);
	}

	try {
		for (let i = 0; i < unitsCount; i++) {
			// Simulate waiting
			await waitForMs(1000);

			await productsRepo.increaseColumn("units_in_stock", 1, "id = ?", [
				productId,
			]);
		}
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
