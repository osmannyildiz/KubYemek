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
	ServiceAddCustomerRequestBody,
	ServiceAddToCustomerPointsRequestBody,
	ServiceUpdateCustomerRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceRequestHandler,
	ServiceRequestHandlerWithParams,
	ServiceRequestHandlerWithQuery,
} from "@core/services/models/requestHandlers";
import {
	ServiceAddCustomerResponseBody,
	ServiceAddToCustomerPointsResponseBody,
	ServiceDeleteCustomerResponseBody,
	ServiceErrorResponseBody,
	ServiceGetCustomerResponseBody,
	ServiceGetCustomersResponseBody,
	ServiceSuccessResponseBody,
	ServiceUpdateCustomerResponseBody,
} from "@core/services/models/responseBody";
import { generateSetClauseAndValuesForDbUpdate } from "@core/services/utils";

export const getCustomers: ServiceRequestHandler<
	null,
	ServiceGetCustomersResponseBody
> = async (req, res) => {
	const customersRepo = db.customers();

	let customers;
	try {
		customers = await customersRepo.getAll();
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
		new HttpOkResponse(new ServiceSuccessResponseBody(customers))
	);
};

export const addCustomer: ServiceRequestHandler<
	ServiceAddCustomerRequestBody,
	ServiceAddCustomerResponseBody
> = async (req, res) => {
	const { email, hashedPassword, name, surname, deliveryAddress, birthDate } =
		req.body;
	const customersRepo = db.customers();

	if (
		!email ||
		!hashedPassword ||
		!name ||
		!surname ||
		!deliveryAddress ||
		!birthDate
	) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	{
		let existingCustomer;
		try {
			existingCustomer = await customersRepo.getOne("email = ?", [email]);
		} catch (error) {
			console.error(error);
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ServiceErrorResponseBody(ErrorType.default)
				)
			);
		}
		if (existingCustomer) {
			return sendHttpResp(
				res,
				new HttpBadRequestResponse(
					new ServiceErrorResponseBody(ErrorType.emailAlreadyExists)
				)
			);
		}
	}

	try {
		await customersRepo.insert(
			email,
			hashedPassword,
			name,
			surname,
			deliveryAddress,
			birthDate
		);
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

export const getCustomer: ServiceRequestHandlerWithParams<
	null,
	ServiceGetCustomerResponseBody,
	"customerId"
> = async (req, res) => {
	const { customerId } = req.params;
	const customersRepo = db.customers();

	let customer;
	try {
		customer = await customersRepo.getById(+customerId);
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ServiceErrorResponseBody(ErrorType.default)
			)
		);
	}
	if (!customer) {
		return sendHttpResp(
			res,
			new HttpNotFoundResponse(new ServiceErrorResponseBody(ErrorType.notFound))
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(customer))
	);
};

export const getCustomerByEmail: ServiceRequestHandlerWithQuery<
	null,
	ServiceGetCustomerResponseBody,
	{ email: string }
> = async (req, res) => {
	const { email } = req.query;
	const customersRepo = db.customers();

	if (!email) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	let customer;
	try {
		customer = await customersRepo.getOne("email = ?", [email]);
	} catch (error) {
		console.error(error);
		return sendHttpResp(
			res,
			new HttpInternalServerErrorResponse(
				new ServiceErrorResponseBody(ErrorType.default)
			)
		);
	}
	if (!customer) {
		return sendHttpResp(
			res,
			new HttpNotFoundResponse(new ServiceErrorResponseBody(ErrorType.notFound))
		);
	}

	return sendHttpResp(
		res,
		new HttpOkResponse(new ServiceSuccessResponseBody(customer))
	);
};

export const updateCustomer: ServiceRequestHandlerWithParams<
	ServiceUpdateCustomerRequestBody,
	ServiceUpdateCustomerResponseBody,
	"customerId"
> = async (req, res) => {
	const { customerId } = req.params;
	const customersRepo = db.customers();

	if (req.body.email) {
		let existingCustomer;
		try {
			existingCustomer = await customersRepo.getOne("id != ? AND email = ?", [
				customerId,
				req.body.email,
			]);
		} catch (error) {
			console.error(error);
			return sendHttpResp(
				res,
				new HttpInternalServerErrorResponse(
					new ServiceErrorResponseBody(ErrorType.default)
				)
			);
		}
		if (existingCustomer) {
			return sendHttpResp(
				res,
				new HttpBadRequestResponse(
					new ServiceErrorResponseBody(ErrorType.emailAlreadyExists)
				)
			);
		}
	}

	try {
		await customersRepo.update(
			...generateSetClauseAndValuesForDbUpdate(req.body),
			"id = ?",
			[customerId]
		);
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
		new HttpOkResponse(new ServiceSuccessResponseBody(undefined))
	);
};

export const deleteCustomer: ServiceRequestHandlerWithParams<
	null,
	ServiceDeleteCustomerResponseBody,
	"customerId"
> = async (req, res) => {
	const { customerId } = req.params;
	const customersRepo = db.customers();

	try {
		await customersRepo.deleteById(+customerId);
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
		new HttpOkResponse(new ServiceSuccessResponseBody(undefined))
	);
};

export const addToCustomerPoints: ServiceRequestHandlerWithParams<
	ServiceAddToCustomerPointsRequestBody,
	ServiceAddToCustomerPointsResponseBody,
	"customerId"
> = async (req, res) => {
	const { customerId } = req.params;
	const { points } = req.body;
	const customersRepo = db.customers();

	if (!points) {
		// TODO This also runs when +points === 0
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	if (isNaN(+points) || +points === 0) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.default)
			)
		);
	}

	try {
		await customersRepo.update("points = points + ?", [points], "id = ?", [
			customerId,
		]);
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
		new HttpOkResponse(new ServiceSuccessResponseBody(undefined))
	);
};
