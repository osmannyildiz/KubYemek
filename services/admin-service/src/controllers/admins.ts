import { db } from "@/db";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpInternalServerErrorResponse,
	HttpNotFoundResponse,
	HttpOkResponse,
} from "@core/common/models/httpResponse";
import { sendHttpResp } from "@core/common/utils";
import {
	ServiceAddAdminRequestBody,
	ServiceUpdateAdminRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceRequestHandler,
	ServiceRequestHandlerWithParams,
} from "@core/services/models/requestHandlers";
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

export const getAdmins: ServiceRequestHandler<
	null,
	ServiceGetAdminsResponseBody
> = async (req, res) => {
	const adminsRepo = db.admins();

	const admins = await adminsRepo.getAll();
	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(admins))
	);
};

export const addAdmin: ServiceRequestHandler<
	ServiceAddAdminRequestBody,
	ServiceAddAdminResponseBody
> = async (req, res) => {
	const { email, password } = req.body;
	const adminsRepo = db.admins();

	if (!email || !password) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	if (password.length < 6) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(
					ErrorType.passwordShouldSatisfyMinimumLength
				)
			)
		);
	}

	const existingAdmin = await adminsRepo.getOne("email=?", [email]);
	if (existingAdmin) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.emailAlreadyExists)
			)
		);
	}

	try {
		await adminsRepo.insert(email, password);
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

export const getAdmin: ServiceRequestHandlerWithParams<
	null,
	ServiceGetAdminResponseBody,
	"adminId"
> = async (req, res) => {
	const { adminId } = req.params;
	const adminsRepo = db.admins();

	const admin = await adminsRepo.getById(+adminId);
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

export const updateAdmin: ServiceRequestHandlerWithParams<
	ServiceUpdateAdminRequestBody,
	ServiceUpdateAdminResponseBody,
	"adminId"
> = async (req, res) => {
	const { adminId } = req.params;
	const adminsRepo = db.admins();

	await adminsRepo.update(
		...generateSetClauseAndValuesForDbUpdate(req.body),
		"id=?",
		[adminId]
	);
	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(undefined))
	);
};

export const deleteAdmin: ServiceRequestHandlerWithParams<
	null,
	ServiceDeleteAdminResponseBody,
	"adminId"
> = async (req, res) => {
	const { adminId } = req.params;
	const adminsRepo = db.admins();

	await adminsRepo.deleteById(+adminId);
	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(undefined))
	);
};
