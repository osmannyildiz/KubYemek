import { OrderDtoAdapter } from "@core/apis/adapters/OrderDtoAdapter";
import {
	ApiRequestHandler,
	ApiRequestHandlerWithParams,
} from "@core/apis/models/requestHandlers";
import {
	ApiCancelOrderResponseBody,
	ApiErrorResponseBody,
	ApiGetOrdersResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { ErrorType } from "@core/common/models/errors";
import { HttpOkResponse, HttpResponse } from "@core/common/models/httpResponse";
import { OrderServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";

export const getOrders: ApiRequestHandler<
	null,
	ApiGetOrdersResponseBody
> = async (req, res) => {
	const orderServiceClient = new OrderServiceClient(req.token);

	let orders;
	try {
		orders = await orderServiceClient.getOrderDtos();
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

	orders = orders.map((o) => OrderDtoAdapter.privateToPublic(o));

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(orders))
	);
};

export const cancelOrder: ApiRequestHandlerWithParams<
	null,
	ApiCancelOrderResponseBody,
	"orderId"
> = async (req, res) => {
	const { orderId } = req.params;
	const orderServiceClient = new OrderServiceClient(req.token);

	try {
		await orderServiceClient.cancelOrder(+orderId);
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
