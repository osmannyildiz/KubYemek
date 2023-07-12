import { AdminAdapter } from "@core/apis/adapters/AdminAdapter";
import { ApiUpdateAdminRequestBody } from "@core/apis/models/requestBody";
import {
	ApiRequestHandler,
	ApiRequestHandlerWithParams,
} from "@core/apis/models/requestHandlers";
import {
	ApiDeleteAdminResponseBody,
	ApiErrorResponseBody,
	ApiGetAdminsResponseBody,
	ApiSuccessResponseBody,
	ApiUpdateAdminResponseBody,
} from "@core/apis/models/responseBody";
import { ErrorType } from "@core/common/models/errors";
import { HttpOkResponse, HttpResponse } from "@core/common/models/httpResponse";
import { AdminServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";

export const getAdmins: ApiRequestHandler<
	null,
	ApiGetAdminsResponseBody
> = async (req, res) => {
	const adminServiceClient = new AdminServiceClient(req.token);

	let admins;
	try {
		admins = await adminServiceClient.getAdmins();
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

	admins = admins.map((a) => AdminAdapter.privateToPublic(a));

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(admins))
	);
};

export const updateAdmin: ApiRequestHandlerWithParams<
	ApiUpdateAdminRequestBody,
	ApiUpdateAdminResponseBody,
	"adminId"
> = async (req, res) => {
	const { adminId } = req.params;
	const adminServiceClient = new AdminServiceClient(req.token);

	try {
		await adminServiceClient.updateAdmin(+adminId, req.body);
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

export const deleteAdmin: ApiRequestHandlerWithParams<
	null,
	ApiDeleteAdminResponseBody,
	"adminId"
> = async (req, res) => {
	const { adminId } = req.params;
	const adminServiceClient = new AdminServiceClient(req.token);

	try {
		await adminServiceClient.deleteAdmin(+adminId);
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
