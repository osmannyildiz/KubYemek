import { hashPassword } from "@/utils";
import { ApiRegisterAdminRequestBody } from "@core/apis/models/requestBody";
import { ApiRequestHandler } from "@core/apis/models/requestHandlers";
import {
	ApiErrorResponseBody,
	ApiRegisterAdminResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpInternalServerErrorResponse,
	HttpOkResponse,
} from "@core/common/models/httpResponse";
import { AdminServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";

export const registerAdmin: ApiRequestHandler<
	ApiRegisterAdminRequestBody,
	ApiRegisterAdminResponseBody
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
		await AdminServiceClient.addAdmin({ email, hashedPassword });
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
