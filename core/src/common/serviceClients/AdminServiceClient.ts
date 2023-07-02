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
	constructor(private token?: string) {}

	async getAdmins(): Promise<Admin_Private[]> {
		const resp = await fetch(`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins`, {
			headers: {
				...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
			},
		});
		const respBody: ServiceGetAdminsResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async addAdmin(data: ServiceAddAdminRequestBody) {
		const resp = await fetch(`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins`, {
			method: "POST",
			headers: {
				...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ServiceAddAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async getAdmin(adminId: number): Promise<Admin_Private> {
		const resp = await fetch(
			`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins/${adminId}`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async getAdminByEmail(email: string): Promise<Admin_Private> {
		const resp = await fetch(
			`${
				CONFIG.ADMIN_SERVICE_ADDRESS
			}/admins/byEmail?email=${encodeURIComponent(email)}`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async updateAdmin(adminId: number, data: ServiceUpdateAdminRequestBody) {
		const resp = await fetch(
			`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins/${adminId}`,
			{
				method: "PATCH",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceUpdateAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async deleteAdmin(adminId: number) {
		const resp = await fetch(
			`${CONFIG.ADMIN_SERVICE_ADDRESS}/admins/${adminId}`,
			{
				method: "DELETE",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceDeleteAdminResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}
}
