import { CustomerAdapter } from "@core/apis/adapters/CustomerAdapter";
import { ApiAddToCustomerPointsRequestBody } from "@core/apis/models/requestBody";
import {
	ApiRequestHandler,
	ApiRequestHandlerWithParams,
} from "@core/apis/models/requestHandlers";
import {
	ApiAddToCustomerPointsResponseBody,
	ApiErrorResponseBody,
	ApiGetCustomersResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpOkResponse,
	HttpResponse,
} from "@core/common/models/httpResponse";
import { CustomerServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";

export const getCustomers: ApiRequestHandler<
	null,
	ApiGetCustomersResponseBody
> = async (req, res) => {
	const customerServiceClient = new CustomerServiceClient(req.token);

	let customers;
	try {
		customers = await customerServiceClient.getCustomers();
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

	customers = customers.map((a) => CustomerAdapter.privateToPublic(a));

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(customers))
	);
};

export const addToCustomerPoints: ApiRequestHandlerWithParams<
	ApiAddToCustomerPointsRequestBody,
	ApiAddToCustomerPointsResponseBody,
	"customerId"
> = async (req, res) => {
	const { customerId } = req.params;
	const { points } = req.body;
	const customerServiceClient = new CustomerServiceClient(req.token);

	if (!points) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ApiErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	try {
		await customerServiceClient.addToCustomerPoints(+customerId, { points });
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
