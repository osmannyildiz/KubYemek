import { ProductAdapter } from "@core/apis/adapters/ProductAdapter";
import {
	ApiAddProductRequestBody,
	ApiProduceProductRequestBody,
	ApiUpdateProductRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiRequestHandler,
	ApiRequestHandlerWithParams,
} from "@core/apis/models/requestHandlers";
import {
	ApiAddProductResponseBody,
	ApiDeleteProductResponseBody,
	ApiErrorResponseBody,
	ApiGetProductsResponseBody,
	ApiProduceProductResponseBody,
	ApiSuccessResponseBody,
	ApiUpdateProductResponseBody,
} from "@core/apis/models/responseBody";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpOkResponse,
	HttpResponse,
} from "@core/common/models/httpResponse";
import { ProductServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";
import { ServiceErrorResponseBody } from "@core/services/models/responseBody";
import FormData from "form-data";

export const getProducts: ApiRequestHandler<
	null,
	ApiGetProductsResponseBody
> = async (req, res) => {
	const productServiceClient = new ProductServiceClient(req.token);

	let products;
	try {
		products = await productServiceClient.getProducts();
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpResponse(
				error?.resp?.status || 500,
				new ApiErrorResponseBody(
					error?.respBody?.errorType || ErrorType.default
				)
			)
		);
	}

	products = products.map((p) => ProductAdapter.privateToPublic(p));

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(products))
	);
};

export const addProduct: ApiRequestHandler<
	ApiAddProductRequestBody,
	ApiAddProductResponseBody
> = async (req, res) => {
	const { name, unitOfSale, price } = req.body;
	const productServiceClient = new ProductServiceClient(req.token);

	if (!name || !unitOfSale || !price) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ApiErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	const formData = new FormData();
	formData.append("name", name);
	formData.append("unitOfSale", unitOfSale);
	formData.append("price", price);

	if (req.file) {
		formData.append("image", req.file.buffer, req.file.originalname);
	} else {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	try {
		await productServiceClient.addProduct(formData);
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpResponse(
				error?.resp?.status || 500,
				new ApiErrorResponseBody(
					error?.respBody?.errorType || ErrorType.default
				)
			)
		);
	}

	return sendHttpResp(
		res,
		new HttpCreatedResponse(new ApiSuccessResponseBody(undefined))
	);
};

export const updateProduct: ApiRequestHandlerWithParams<
	ApiUpdateProductRequestBody,
	ApiUpdateProductResponseBody,
	"productId"
> = async (req, res) => {
	const { productId } = req.params;
	const productServiceClient = new ProductServiceClient(req.token);

	const updates = req.body;

	const formData = new FormData();
	if (updates.name) {
		formData.append("name", updates.name);
	}
	if (updates.slug) {
		formData.append("slug", updates.slug);
	}
	if (updates.unitOfSale) {
		formData.append("unitOfSale", updates.unitOfSale);
	}
	if (updates.price) {
		formData.append("price", updates.price);
	}
	if (req.file) {
		formData.append("image", req.file.buffer, req.file.originalname);
	}

	try {
		await productServiceClient.updateProduct(+productId, formData);
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpResponse(
				error?.resp?.status || 500,
				new ApiErrorResponseBody(
					error?.respBody?.errorType || ErrorType.default
				)
			)
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(undefined))
	);
};

export const deleteProduct: ApiRequestHandlerWithParams<
	null,
	ApiDeleteProductResponseBody,
	"productId"
> = async (req, res) => {
	const { productId } = req.params;
	const productServiceClient = new ProductServiceClient(req.token);

	try {
		await productServiceClient.deleteProduct(+productId);
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpResponse(
				error?.resp?.status || 500,
				new ApiErrorResponseBody(
					error?.respBody?.errorType || ErrorType.default
				)
			)
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(undefined))
	);
};

export const produceProduct: ApiRequestHandlerWithParams<
	ApiProduceProductRequestBody,
	ApiProduceProductResponseBody,
	"productId"
> = async (req, res) => {
	const { productId } = req.params;
	const productServiceClient = new ProductServiceClient(req.token);

	try {
		await productServiceClient.produceProduct(+productId, req.body);
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpResponse(
				error?.resp?.status || 500,
				new ApiErrorResponseBody(
					error?.respBody?.errorType || ErrorType.default
				)
			)
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(undefined))
	);
};
