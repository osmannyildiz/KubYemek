import { db } from "@/db";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpNotFoundResponse,
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
	ServiceErrorResponseBody,
	ServiceGetAdminResponseBody,
	ServiceGetAdminsResponseBody,
	ServiceSuccessResponseBody,
	ServiceUpdateAdminResponseBody,
} from "@core/services/models/responseBody";
import { generateSetClauseAndValuesForDbUpdate } from "@core/services/utils";
import type { RequestHandler } from "express";

export const getAdmins: RequestHandler<
	undefined,
	ServiceGetAdminsResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	const adminRepo = db.admins();

	const admins = await adminRepo.getAll();
	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(admins))
	);
};

export const addAdmin: RequestHandler<
	undefined,
	ServiceAddAdminResponseBody,
	ServiceAddAdminRequestBody,
	undefined
> = async (req, res) => {
	const { email, password } = req.body;
	const adminRepo = db.admins();

	if (!email || !password) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	const existingAdmin = await adminRepo.getOne("email=?", [email]);
	if (existingAdmin) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.emailAlreadyExists)
			)
		);
	}

	await adminRepo.insert(email, password);
	return sendHttpResp(
		res,
		new HttpCreatedResponse(new ServiceSuccessResponseBody())
	);
};

export const getAdmin: RequestHandler<
	{ adminId: string },
	ServiceGetAdminResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	const { adminId } = req.params;
	const adminRepo = db.admins();

	const admin = await adminRepo.getById(+adminId);
	if (!admin) {
		return sendHttpResp(
			res,
			new HttpNotFoundResponse(new ServiceErrorResponseBody(ErrorType.notFound))
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(admin))
	);
};

export const updateAdmin: RequestHandler<
	{ adminId: string },
	ServiceUpdateAdminResponseBody,
	ServiceUpdateAdminRequestBody,
	undefined
> = async (req, res) => {
	const { adminId } = req.params;
	const adminRepo = db.admins();

	await adminRepo.update(
		...generateSetClauseAndValuesForDbUpdate(req.body),
		"id=?",
		[adminId]
	);
	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody())
	);
};

export const deleteAdmin: RequestHandler<
	{ adminId: string },
	ServiceDeleteAdminResponseBody,
	undefined,
	undefined
> = async (req, res) => {
	const { adminId } = req.params;
	const adminRepo = db.admins();

	await adminRepo.deleteById(+adminId);
	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody())
	);
};
