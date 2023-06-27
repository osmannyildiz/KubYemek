import { AdminAdapter } from "@/adapters/AdminAdapter";
import {
	ApiAddAdminRequestBody,
	ApiUpdateAdminRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiAddAdminResponseBody,
	ApiDeleteAdminResponseBody,
	ApiErrorResponseBody,
	ApiGetAdminResponseBody,
	ApiGetAdminsResponseBody,
	ApiSuccessResponseBody,
	ApiUpdateAdminResponseBody,
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
	ServiceAddAdminRequestBody,
	ServiceUpdateAdminRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceAddAdminResponseBody,
	ServiceDeleteAdminResponseBody,
	ServiceGetAdminResponseBody,
	ServiceGetAdminsResponseBody,
	ServiceUpdateAdminResponseBody,
} from "@core/services/models/responseBody";
import type { RequestHandler } from "express";
import fetch from "node-fetch";

export const getAdmins: RequestHandler<
	undefined,
	ApiGetAdminsResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	let admins;
	try {
		const svcResp = await fetch("http://localhost:8000/admins");
		const svcRespBody: ServiceGetAdminsResponseBody = await svcResp.json();

		if (serviceRespBodyIsNotOk(svcRespBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(svcRespBody.errorType)
				)
			);
		}

		admins = svcRespBody.data.map((a) => AdminAdapter.privateToPublic(a));
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
		new HttpOkResponse(new ApiSuccessResponseBody(admins))
	);
};

export const addAdmin: RequestHandler<
	undefined,
	ApiAddAdminResponseBody,
	ApiAddAdminRequestBody,
	undefined
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
		const svcReqBody: ServiceAddAdminRequestBody = { email, password };
		const svcResp = await fetch("http://localhost:8000/admins", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(svcReqBody),
		});
		const svcRespBody: ServiceAddAdminResponseBody = await svcResp.json();

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

export const getAdmin: RequestHandler<
	{ adminId: string },
	ApiGetAdminResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	const { adminId } = req.params;

	let admin;
	try {
		const svcResp = await fetch(`http://localhost:8000/admins/${adminId}`);
		const svcRespBody: ServiceGetAdminResponseBody = await svcResp.json();

		if (serviceRespBodyIsNotOk(svcRespBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(svcRespBody.errorType)
				)
			);
		}

		admin = AdminAdapter.privateToPublic(svcRespBody.data);
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
		new HttpOkResponse(new ApiSuccessResponseBody(admin))
	);
};

export const updateAdmin: RequestHandler<
	{ adminId: string },
	ApiUpdateAdminResponseBody,
	ApiUpdateAdminRequestBody,
	undefined
> = async (req, res) => {
	const { adminId } = req.params;

	try {
		const svcReqBody: ServiceUpdateAdminRequestBody = req.body;
		const svcResp = await fetch(`http://localhost:8000/admins/${adminId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(svcReqBody),
		});
		const svcRespBody: ServiceUpdateAdminResponseBody = await svcResp.json();

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

export const deleteAdmin: RequestHandler<
	{ adminId: string },
	ApiDeleteAdminResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	const { adminId } = req.params;

	let admin;
	try {
		const svcResp = await fetch(`http://localhost:8000/admins/${adminId}`, {
			method: "DELETE",
		});
		const svcRespBody: ServiceDeleteAdminResponseBody = await svcResp.json();

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
