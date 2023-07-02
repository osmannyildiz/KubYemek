import {
	checkPasswordWithHash,
	createTokenForAdmin,
	hashPassword,
} from "@/utils";
import { AdminAdapter } from "@core/apis/adapters/AdminAdapter";
import {
	ApiLoginAdminRequestBody,
	ApiRegisterAdminRequestBody,
} from "@core/apis/models/requestBody";
import { ApiRequestHandler } from "@core/apis/models/requestHandlers";
import {
	ApiErrorResponseBody,
	ApiLoginAdminResponseBody,
	ApiLoginAdminSuccessResponseBody,
	ApiRegisterAdminResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpOkResponse,
	HttpResponse,
	HttpUnauthorizedResponse,
} from "@core/common/models/httpResponse";
import { AdminServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";

export const registerAdmin: ApiRequestHandler<
	ApiRegisterAdminRequestBody,
	ApiRegisterAdminResponseBody
> = async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ApiErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	if (password.length < 6) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ApiErrorResponseBody(ErrorType.passwordShouldSatisfyMinimumLength)
			)
		);
	}

	const hashedPassword = await hashPassword(password);

	try {
		await AdminServiceClient.addAdmin({ username, email, hashedPassword });
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

export const loginAdmin: ApiRequestHandler<
	ApiLoginAdminRequestBody,
	ApiLoginAdminResponseBody
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

	let admin;
	try {
		admin = await AdminServiceClient.getAdminByEmail(email);
	} catch (error: any) {
		console.error(error);
		// Return 401 even when admin not found (TODO: What if NetworkError happens?)
		return sendHttpResp(
			res,
			new HttpUnauthorizedResponse(
				new ApiErrorResponseBody(ErrorType.loginIsInvalid)
			)
		);
	}

	const loginIsValid = await checkPasswordWithHash(
		password,
		admin.hashed_password
	);
	if (!loginIsValid) {
		return sendHttpResp(
			res,
			new HttpUnauthorizedResponse(
				new ApiErrorResponseBody(ErrorType.loginIsInvalid)
			)
		);
	}

	const pubAdmin = AdminAdapter.privateToPublic(admin);
	const token = createTokenForAdmin(pubAdmin);

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiLoginAdminSuccessResponseBody(token))
	);
};
