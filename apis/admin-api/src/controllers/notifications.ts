import { AdminNotificationAdapter } from "@core/apis/adapters/AdminNotificationAdapter";
import { ApiRequestHandler } from "@core/apis/models/requestHandlers";
import {
	ApiErrorResponseBody,
	ApiGetNotificationsResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { ErrorType } from "@core/common/models/errors";
import { HttpOkResponse, HttpResponse } from "@core/common/models/httpResponse";
import { NotificationServiceClient } from "@core/common/serviceClients";
import { sendHttpResp } from "@core/common/utils";

export const getNotifications: ApiRequestHandler<
	null,
	ApiGetNotificationsResponseBody
> = async (req, res) => {
	const notificationServiceClient = new NotificationServiceClient(req.token);

	let notifications;
	try {
		notifications = await notificationServiceClient.getAdminNotifications();
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

	notifications = notifications.map((o) =>
		AdminNotificationAdapter.privateToPublic(o)
	);

	return sendHttpResp(
		res,
		new HttpOkResponse(new ApiSuccessResponseBody(notifications))
	);
};
