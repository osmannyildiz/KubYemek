import {
	checkPasswordWithHash,
	createTokenForCustomer,
	hashPassword,
} from "@/utils";
import { CustomerAdapter } from "@core/apis/adapters/CustomerAdapter";
import {
	ApiChangeCustomerPasswordRequestBody,
	ApiLoginCustomerRequestBody,
	ApiRegisterCustomerRequestBody,
} from "@core/apis/models/requestBody";
import { ApiRequestHandler } from "@core/apis/models/requestHandlers";
import {
	ApiChangeCustomerPasswordResponseBody,
	ApiErrorResponseBody,
	ApiLoginCustomerResponseBody,
	ApiLoginCustomerSuccessResponseBody,
	ApiRegisterCustomerResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { CustomerTokenPayload } from "@core/common/models/auth";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpNotFoundResponse,
	HttpOkResponse,
	HttpResponse,
	HttpUnauthorizedResponse,
} from "@core/common/models/httpResponse";
import { CustomerServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";

export const registerCustomer: ApiRequestHandler<
	ApiRegisterCustomerRequestBody,
	ApiRegisterCustomerResponseBody
> = async (req, res) => {
	const { email, password, name, surname, deliveryAddress, birthDate } =
		req.body;
	const customerServiceClient = new CustomerServiceClient(req.token);

	if (
		!email ||
		!password ||
		!name ||
		!surname ||
		!deliveryAddress ||
		!birthDate
	) {
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
		await customerServiceClient.addCustomer({
			email,
			hashedPassword,
			name,
			surname,
			deliveryAddress,
			birthDate,
		});
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

export const loginCustomer: ApiRequestHandler<
	ApiLoginCustomerRequestBody,
	ApiLoginCustomerResponseBody
> = async (req, res) => {
	const { email, password } = req.body;
	const customerServiceClient = new CustomerServiceClient(req.token);

	if (!email || !password) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ApiErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	let customer;
	try {
		customer = await customerServiceClient.getCustomerByEmail(email);
	} catch (error: any) {
		console.error(error);
		// Return 401 even when customer not found (TODO: What if NetworkError happens?)
		return sendHttpResp(
			res,
			new HttpUnauthorizedResponse(
				new ApiErrorResponseBody(ErrorType.loginIsInvalid)
			)
		);
	}

	const loginIsValid = await checkPasswordWithHash(
		password,
		customer.hashed_password
	);
	if (!loginIsValid) {
		return sendHttpResp(
			res,
			new HttpUnauthorizedResponse(
				new ApiErrorResponseBody(ErrorType.loginIsInvalid)
			)
		);
	}

	const pubCustomer = CustomerAdapter.privateToPublic(customer);
	const token = createTokenForCustomer(pubCustomer);

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiLoginCustomerSuccessResponseBody(token))
	);
};

export const changeCustomerPassword: ApiRequestHandler<
	ApiChangeCustomerPasswordRequestBody,
	ApiChangeCustomerPasswordResponseBody
> = async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const { customerId } = req.tokenPayload as CustomerTokenPayload;
	const customerServiceClient = new CustomerServiceClient(req.token);

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

	let customer;
	try {
		customer = await customerServiceClient.getCustomer(customerId);
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
	if (!customer) {
		return sendHttpResp(
			res,
			new HttpNotFoundResponse(new ApiErrorResponseBody(ErrorType.notFound))
		);
	}

	const currentPasswordIsCorrect = await checkPasswordWithHash(
		currentPassword,
		customer.hashed_password
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
		await customerServiceClient.updateCustomer(customer.id, { hashedPassword });
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
