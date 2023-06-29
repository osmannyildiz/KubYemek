import { AdminAdapter } from "@/adapters/AdminAdapter";
import {
	ApiAddAdminRequestBody,
	ApiUpdateAdminRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiRequestHandler,
	ApiRequestHandlerWithParams,
} from "@core/apis/models/requestHandlers";
import {
	ApiAddAdminResponseBody,
	ApiDeleteAdminResponseBody,
	ApiErrorResponseBody,
	ApiGetAdminResponseBody,
	ApiGetAdminsResponseBody,
	ApiSuccessResponseBody,
	ApiUpdateAdminResponseBody,
} from "@core/apis/models/responseBody";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpInternalServerErrorResponse,
	HttpOkResponse,
} from "@core/common/models/httpResponse";
import { AdminServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";

export const getAdmins: ApiRequestHandler<
	null,
	ApiGetAdminsResponseBody
> = async (req, res) => {
	let admins;
	try {
		admins = await AdminServiceClient.getAdmins();
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(error.errorType || ErrorType.default)
			)
		);
	}

	admins = admins.map((a) => AdminAdapter.privateToPublic(a));

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(admins))
	);
};

export const addAdmin: ApiRequestHandler<
	ApiAddAdminRequestBody,
	ApiAddAdminResponseBody
> = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ApiErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	try {
		await AdminServiceClient.addAdmin({ email, password });
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

export const getAdmin: ApiRequestHandlerWithParams<
	null,
	ApiGetAdminResponseBody,
	"adminId"
> = async (req, res) => {
	const { adminId } = req.params;

	let admin;
	try {
		admin = await AdminServiceClient.getAdmin(+adminId);
	} catch (error: any) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ApiErrorResponseBody(error.errorType || ErrorType.default)
			)
		);
	}

	admin = AdminAdapter.privateToPublic(admin);

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(admin))
	);
};

export const updateAdmin: ApiRequestHandlerWithParams<
	ApiUpdateAdminRequestBody,
	ApiUpdateAdminResponseBody,
	"adminId"
> = async (req, res) => {
	const { adminId } = req.params;

	try {
		await AdminServiceClient.updateAdmin(+adminId, req.body);
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

export const deleteAdmin: ApiRequestHandlerWithParams<
	null,
	ApiDeleteAdminResponseBody,
	"adminId"
> = async (req, res) => {
	const { adminId } = req.params;

	try {
		await AdminServiceClient.deleteAdmin(+adminId);
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
