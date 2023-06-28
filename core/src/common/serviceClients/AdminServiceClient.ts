import { CONFIG } from "@core/apis/config";
import { serviceRespBodyIsNotOk } from "@core/apis/utils";
import { ServiceRespBodyIsNotOkError } from "@core/common/models/ServiceRespBodyIsNotOkError";
import { Admin_Private } from "@core/common/models/entity/backend";
import {
	ServiceAddAdminRequestBody,
	ServiceUpdateAdminRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceAddAdminResponseBody,
	ServiceDeleteAdminResponseBody,
	ServiceGetAdminResponseBody,
	ServiceGetAdminsResponseBody,
	ServiceUpdateAdminResponseBody,
} from "@core/services/models/responseBody";
import fetch from "node-fetch";

export class AdminServiceClient {
	static async getAdmins(): Promise<Admin_Private[]> {
		const resp = await fetch(`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins`);
		const respBody: ServiceGetAdminsResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}

		return respBody.data;
	}

	static async addAdmin(data: ServiceAddAdminRequestBody) {
		const resp = await fetch(`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ServiceAddAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}
	}

	static async getAdmin(adminId: number): Promise<Admin_Private> {
		const resp = await fetch(
			`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins/${adminId}`
		);
		const respBody: ServiceGetAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}

		return respBody.data;
	}

	static async updateAdmin(
		adminId: number,
		data: ServiceUpdateAdminRequestBody
	) {
		const resp = await fetch(
			`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins/${adminId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceUpdateAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}
	}

	static async deleteAdmin(adminId: number) {
		const resp = await fetch(
			`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins/${adminId}`,
			{
				method: "DELETE",
			}
		);
		const respBody: ServiceDeleteAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}
	}
}
