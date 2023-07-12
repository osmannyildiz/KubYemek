import { CORE_APIS_CONFIG } from "@core/apis/config";
import { serviceRespBodyIsNotOk } from "@core/apis/utils";
import { ServiceRespBodyIsNotOkError } from "@core/common/models/ServiceRespBodyIsNotOkError";
import {
	AdminNotification_Private,
	CustomerNotification_Private,
} from "@core/common/models/entity/backend";
import {
	ServiceAddAdminNotificationRequestBody,
	ServiceAddCustomerNotificationRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceAddAdminNotificationResponseBody,
	ServiceAddCustomerNotificationResponseBody,
	ServiceGetAdminNotificationsResponseBody,
	ServiceGetCustomerNotificationsResponseBody,
} from "@core/services/models/responseBody";
import fetch from "node-fetch";

export class NotificationServiceClient {
	constructor(private token?: string) {}

	async getAdminNotifications(): Promise<AdminNotification_Private[]> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.NOTIFICATION_SERVICE_ADDRESS}/admins/notifications`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetAdminNotificationsResponseBody =
			await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async addAdminNotification(data: ServiceAddAdminNotificationRequestBody) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.NOTIFICATION_SERVICE_ADDRESS}/admins/notifications`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceAddAdminNotificationResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async getCustomerNotifications(
		customerId: number
	): Promise<CustomerNotification_Private[]> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.NOTIFICATION_SERVICE_ADDRESS}/customers/${customerId}/notifications`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetCustomerNotificationsResponseBody =
			await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async addCustomerNotification(
		customerId: number,
		data: ServiceAddCustomerNotificationRequestBody
	) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.NOTIFICATION_SERVICE_ADDRESS}/customers/${customerId}/notifications`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceAddCustomerNotificationResponseBody =
			await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}
}
