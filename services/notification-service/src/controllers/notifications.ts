import { db } from "@/db";
import {
	AdminTokenPayload,
	CustomerTokenPayload,
} from "@core/common/models/auth";
import { ErrorType } from "@core/common/models/errors";
import {
	HttpBadRequestResponse,
	HttpCreatedResponse,
	HttpInternalServerErrorResponse,
	HttpOkResponse,
	HttpUnauthorizedResponse,
} from "@core/common/models/httpResponse";
import { isCustomerTokenPayload, sendHttpResp } from "@core/common/utils";
import {
	ServiceAddAdminNotificationRequestBody,
	ServiceAddCustomerNotificationRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceRequestHandler,
	ServiceRequestHandlerWithParams,
} from "@core/services/models/requestHandlers";
import {
	ServiceAddAdminNotificationResponseBody,
	ServiceAddCustomerNotificationResponseBody,
	ServiceErrorResponseBody,
	ServiceGetAdminNotificationsResponseBody,
	ServiceGetCustomerNotificationsResponseBody,
	ServiceSuccessResponseBody,
} from "@core/services/models/responseBody";
import { datetimeForDb } from "@core/services/utils";

export const getAdminNotifications: ServiceRequestHandler<
	null,
	ServiceGetAdminNotificationsResponseBody
> = async (req, res) => {
	const adminNotificationsRepo = db.adminNotifications();

	let adminNotifications;
	try {
		adminNotifications = await adminNotificationsRepo.getAll();
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
		new HttpOkResponse(new ServiceSuccessResponseBody(adminNotifications))
	);
};

export const addAdminNotification: ServiceRequestHandler<
	ServiceAddAdminNotificationRequestBody,
	ServiceAddAdminNotificationResponseBody
> = async (req, res) => {
	const { kind, title, description } = req.body;
	const adminNotificationsRepo = db.adminNotifications();

	if (!kind || !title || !description) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	try {
		await adminNotificationsRepo.insert(
			datetimeForDb(new Date()),
			kind,
			title,
			description
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

export const getCustomerNotifications: ServiceRequestHandlerWithParams<
	null,
	ServiceGetCustomerNotificationsResponseBody,
	"customerId"
> = async (req, res) => {
	const { customerId } = req.params;
	const tokenPayload = req.tokenPayload as
		| AdminTokenPayload
		| CustomerTokenPayload;
	const customerNotificationsRepo = db.customerNotifications();

	if (
		isCustomerTokenPayload(tokenPayload) &&
		tokenPayload.customerId !== +customerId
	) {
		return sendHttpResp(
			res,
			new HttpUnauthorizedResponse(
				new ServiceErrorResponseBody(ErrorType.notAllowedForUser)
			)
		);
	}

	let customerNotifications;
	try {
		customerNotifications = await customerNotificationsRepo.getAll(
			"customer_id = ?",
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
		new HttpOkResponse(new ServiceSuccessResponseBody(customerNotifications))
	);
};

export const addCustomerNotification: ServiceRequestHandlerWithParams<
	ServiceAddCustomerNotificationRequestBody,
	ServiceAddCustomerNotificationResponseBody,
	"customerId"
> = async (req, res) => {
	const { customerId } = req.params;
	const { kind, title, description } = req.body;
	const customerNotificationsRepo = db.customerNotifications();

	if (!kind || !title || !description) {
		return sendHttpResp(
			res,
			new HttpBadRequestResponse(
				new ServiceErrorResponseBody(ErrorType.requiredFieldEmpty)
			)
		);
	}

	try {
		await customerNotificationsRepo.insert(
			+customerId,
			datetimeForDb(new Date()),
			kind,
			title,
			description
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
