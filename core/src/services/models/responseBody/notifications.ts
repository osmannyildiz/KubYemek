import {
	AdminNotification_Private,
	CustomerNotification_Private,
} from "@core/common/models/entity/backend";
import {
	ServiceErrorResponseBody,
	ServiceSuccessResponseBody,
} from "@core/services/models/responseBody";

export type ServiceGetAdminNotificationsResponseBody =
	| ServiceSuccessResponseBody<AdminNotification_Private[]>
	| ServiceErrorResponseBody;

export type ServiceAddAdminNotificationResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceGetCustomerNotificationsResponseBody =
	| ServiceSuccessResponseBody<CustomerNotification_Private[]>
	| ServiceErrorResponseBody;

export type ServiceAddCustomerNotificationResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;
