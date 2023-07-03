import {
	checkPasswordWithHash,
	createTokenForAdmin,
	hashPassword,
} from "@/utils";
import { AdminAdapter } from "@core/apis/adapters/AdminAdapter";
import {
	ApiChangeAdminPasswordRequestBody,
	ApiLoginAdminRequestBody,
	ApiRegisterAdminRequestBody,
} from "@core/apis/models/requestBody";
import { ApiRequestHandler } from "@core/apis/models/requestHandlers";
import {
	ApiChangeAdminPasswordResponseBody,
	ApiErrorResponseBody,
	ApiLoginAdminResponseBody,
	ApiLoginAdminSuccessResponseBody,
	ApiRegisterAdminResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { AdminTokenPayload } from "@core/common/models/auth";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpNotFoundResponse,
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
	const adminServiceClient = new AdminServiceClient(req.token);

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
		await adminServiceClient.addAdmin({ username, email, hashedPassword });
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
	const adminServiceClient = new AdminServiceClient(req.token);

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
		admin = await adminServiceClient.getAdminByEmail(email);
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

export const changeAdminPassword: ApiRequestHandler<
	ApiChangeAdminPasswordRequestBody,
	ApiChangeAdminPasswordResponseBody
> = async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const adminServiceClient = new AdminServiceClient(req.token);
	const tokenPayload = req.tokenPayload as AdminTokenPayload;

	if (!currentPassword || !newPassword) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ApiErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	if (newPassword.length < 6) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ApiErrorResponseBody(ErrorType.passwordShouldSatisfyMinimumLength)
			)
		);
	}

	let admin;
	try {
		admin = await adminServiceClient.getAdmin(tokenPayload.adminId);
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
	if (!admin) {
		return sendHttpResp(
			res,
			new HttpNotFoundResponse(new ApiErrorResponseBody(ErrorType.notFound))
		);
	}

	const currentPasswordIsCorrect = await checkPasswordWithHash(
		currentPassword,
		admin.hashed_password
	);
	if (!currentPasswordIsCorrect) {
		return sendHttpResp(
			res,
			new HttpUnauthorizedResponse(
				new ApiErrorResponseBody(ErrorType.currentPasswordIsIncorrect)
			)
		);
	}

	const hashedPassword = await hashPassword(newPassword);

	try {
		await adminServiceClient.updateAdmin(admin.id, { hashedPassword });
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
