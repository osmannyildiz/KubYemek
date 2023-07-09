import { db } from "@/db";
import {
	AdminTokenPayload,
	CustomerTokenPayload,
} from "@core/common/models/auth";
import { Product_Private } from "@core/common/models/entity/backend";
import { OrderDto_Private } from "@core/common/models/entity/dto/OrderDto_Private";
import { OrderStatus } from "@core/common/models/entity/enums";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpInternalServerErrorResponse,
	HttpNotFoundResponse,
	HttpOkResponse,
} from "@core/common/models/httpResponse";
import {
	isAdminTokenPayload,
	isCustomerTokenPayload,
	sendHttpResp,
} from "@core/common/utils";
import { Value } from "@core/services/lib/dbpkg/types";
import { ServiceAddOrderRequestBody } from "@core/services/models/requestBody";
import {
	ServiceRequestHandler,
	ServiceRequestHandlerWithParams,
} from "@core/services/models/requestHandlers";
import {
	ServiceAddOrderResponseBody,
	ServiceErrorResponseBody,
	ServiceGetOrderResponseBody,
	ServiceGetOrdersResponseBody,
	ServiceSuccessResponseBody,
} from "@core/services/models/responseBody";
import {
	ServiceCancelOrderResponseBody,
	ServiceGetOrderDtosResponseBody,
} from "@core/services/models/responseBody/orders";
import { datetimeForDb, generateCode } from "@core/services/utils";

export const getOrders: ServiceRequestHandler<
	null,
	ServiceGetOrdersResponseBody
> = async (req, res) => {
	const ordersRepo = db.orders();
	const tokenPayload = req.tokenPayload as
		| AdminTokenPayload
		| CustomerTokenPayload;

	let whereClause, whereValues;
	if (isCustomerTokenPayload(tokenPayload)) {
		whereClause = "customer_id = ?";
		whereValues = [tokenPayload.customerId];
	}

	let orders;
	try {
		orders = await ordersRepo.getAll(whereClause, whereValues);
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
		new HttpOkResponse(new ServiceSuccessResponseBody(orders))
	);
};

export const addOrder: ServiceRequestHandler<
	ServiceAddOrderRequestBody,
	ServiceAddOrderResponseBody
> = async (req, res) => {
	const { products } = req.body;
	const { customerId } = req.tokenPayload as CustomerTokenPayload;
	const ordersRepo = db.orders();
	const orderProductsRepo = db.orderProducts();

	if (
		!customerId ||
		!products.every((p) => p.productId) ||
		!products.every((p) => p.unitCount)
	) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	try {
		const orderId = await ordersRepo.insert(
			customerId,
			generateCode(),
			datetimeForDb(new Date()),
			OrderStatus.inPayment
		);

		for (const orderProduct of products) {
			await orderProductsRepo.insert(
				orderId,
				orderProduct.productId,
				orderProduct.unitCount
			);
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

export const getOrder: ServiceRequestHandlerWithParams<
	null,
	ServiceGetOrderResponseBody,
	"orderId"
> = async (req, res) => {
	const { orderId } = req.params;
	const tokenPayload = req.tokenPayload as
		| AdminTokenPayload
		| CustomerTokenPayload;
	const ordersRepo = db.orders();

	let whereClause = "id = ?";
	let whereValues: Value[] = [orderId];
	if (isCustomerTokenPayload(tokenPayload)) {
		whereClause += " AND customer_id = ?";
		whereValues.push(tokenPayload.customerId);
	}

	let order;
	try {
		order = await ordersRepo.getOne(whereClause, whereValues);
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ServiceErrorResponseBody(ErrorType.default)
			)
		);
	}
	if (!order) {
		return sendHttpResp(
			res,
			new HttpNotFoundResponse(new ServiceErrorResponseBody(ErrorType.notFound))
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(order))
	);
};

export const cancelOrder: ServiceRequestHandlerWithParams<
	null,
	ServiceCancelOrderResponseBody,
	"orderId"
> = async (req, res) => {
	const { orderId } = req.params;
	const tokenPayload = req.tokenPayload as
		| AdminTokenPayload
		| CustomerTokenPayload;
	const ordersRepo = db.orders();

	let whereClause = "id = ?";
	let whereValues: Value[] = [orderId];
	if (isCustomerTokenPayload(tokenPayload)) {
		whereClause += " AND customer_id = ?";
		whereValues.push(tokenPayload.customerId);
	}

	let order;
	try {
		order = await ordersRepo.getOne(whereClause, whereValues);
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ServiceErrorResponseBody(ErrorType.default)
			)
		);
	}
	if (!order) {
		return sendHttpResp(
			res,
			new HttpNotFoundResponse(new ServiceErrorResponseBody(ErrorType.notFound))
		);
	}

	if (
		[OrderStatus.canceledByAdmin, OrderStatus.canceledByCustomer].includes(
			order.status
		)
	) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.orderAlreadyCanceled)
			)
		);
	}

	let newStatus;
	if (isAdminTokenPayload(tokenPayload)) {
		newStatus = OrderStatus.canceledByAdmin;
	} else {
		newStatus = OrderStatus.canceledByCustomer;
	}

	try {
		await ordersRepo.updateColumnWithValue("status", newStatus, "id = ?", [
			orderId,
		]);
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

export const getOrderDtos: ServiceRequestHandler<
	null,
	ServiceGetOrderDtosResponseBody
> = async (req, res) => {
	const tokenPayload = req.tokenPayload as
		| AdminTokenPayload
		| CustomerTokenPayload;
	const ordersRepo = db.orders();
	const orderProductsRepo = db.orderProducts();
	const productsRepo = db.products();

	let whereClause, whereValues;
	if (isCustomerTokenPayload(tokenPayload)) {
		whereClause = "customer_id = ?";
		whereValues = [tokenPayload.customerId];
	}

	let orderDtos: OrderDto_Private[] = [];
	try {
		const orders = await ordersRepo.getAll(whereClause, whereValues);

		for (const order of orders) {
			const orderProducts = await orderProductsRepo.getAll("order_id = ?", [
				order.id,
			]);

			const products: Product_Private[] = [];
			for (const orderProduct of orderProducts) {
				const product = await productsRepo.getById(orderProduct.product_id);
				products.push(product!);
			}

			const orderDto = new OrderDto_Private(order, orderProducts, products);
			orderDtos.push(orderDto);
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

	const orderDtoObjs = orderDtos.map((od) => od.toObject());

	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(orderDtoObjs))
	);
};

export const getOrderDto: ServiceRequestHandlerWithParams<
	null,
	ServiceGetOrderResponseBody,
	"orderId"
> = async (req, res) => {
	const { orderId } = req.params;
	const tokenPayload = req.tokenPayload as
		| AdminTokenPayload
		| CustomerTokenPayload;
	const ordersRepo = db.orders();
	const orderProductsRepo = db.orderProducts();
	const productsRepo = db.products();

	let whereClause = "id = ?";
	let whereValues: Value[] = [orderId];
	if (isCustomerTokenPayload(tokenPayload)) {
		whereClause += " AND customer_id = ?";
		whereValues.push(tokenPayload.customerId);
	}

	let orderDto;
	try {
		const order = await ordersRepo.getOne(whereClause, whereValues);
		if (!order) {
			return sendHttpResp(
				res,
				new HttpNotFoundResponse(
					new ServiceErrorResponseBody(ErrorType.notFound)
				)
			);
		}

		const orderProducts = await orderProductsRepo.getAll("order_id = ?", [
			order.id,
		]);

		const products: Product_Private[] = [];
		for (const orderProduct of orderProducts) {
			const product = await productsRepo.getById(orderProduct.product_id);
			products.push(product!);
		}

		orderDto = new OrderDto_Private(order!, orderProducts, products);
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ServiceErrorResponseBody(ErrorType.default)
			)
		);
	}

	const orderDtoObj = orderDto.toObject();

	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(orderDtoObj))
	);
};
