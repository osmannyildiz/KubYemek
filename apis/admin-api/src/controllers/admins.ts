import { AdminAdapter } from "@/adapters/AdminAdapter";
import {
	ApiAddAdminRequestBody,
	ApiUpdateAdminRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiAddAdminResponseBody,
	ApiErrorResponseBody,
	ApiGetAdminsResponseBody,
	ApiSuccessResponseBody,
	ApiUpdateAdminResponseBody,
} from "@core/apis/models/responseBody";
import {
	ApiDeleteAdminResponseBody,
	ApiGetAdminResponseBody,
} from "@core/apis/models/responseBody/admins";
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
		const resp = await fetch("http://localhost:8000/admins");
		const respBody: ServiceGetAdminsResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(respBody.errorType)
				)
			);
		}

		admins = respBody.data.map((a) => AdminAdapter.privateToPublic(a));
	} catch (error) {
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
		const resp = await fetch("http://localhost:8000/admins", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const respBody: ServiceAddAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(respBody.errorType)
				)
			);
		}
	} catch (error) {
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
		const resp = await fetch(`http://localhost:8000/admins/${adminId}`);
		const respBody: ServiceGetAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(respBody.errorType)
				)
			);
		}

		admin = AdminAdapter.privateToPublic(respBody.data);
	} catch (error) {
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
		const resp = await fetch(`http://localhost:8000/admins/${adminId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(req.body),
		});
		const respBody: ServiceUpdateAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(respBody.errorType)
				)
			);
		}
	} catch (error) {
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
		const resp = await fetch(`http://localhost:8000/admins/${adminId}`, {
			method: "DELETE",
		});
		const respBody: ServiceDeleteAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ApiErrorResponseBody(respBody.errorType)
				)
			);
		}
	} catch (error) {
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
