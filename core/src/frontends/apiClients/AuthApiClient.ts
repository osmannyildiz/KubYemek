import {
	ApiLoginAdminRequestBody,
	ApiRegisterAdminRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiLoginAdminResponseBody,
	ApiRegisterAdminResponseBody,
} from "@core/apis/models/responseBody";
import { CONFIG } from "@core/frontends/config";
import { ApiRespBodyIsNotOkError } from "@core/frontends/models/ApiRespBodyIsNotOkError";
import { apiRespBodyIsNotOk } from "@core/frontends/utils";

export class AuthApiClient {
	constructor(private token?: string) {}

	async registerAdmin(data: ApiRegisterAdminRequestBody) {
		const resp = await fetch(`${CONFIG.AUTH_API_ADDRESS}/admins/register`, {
			method: "POST",
			headers: {
				...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ApiRegisterAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async loginAdmin(data: ApiLoginAdminRequestBody) {
		const resp = await fetch(`${CONFIG.AUTH_API_ADDRESS}/admins/login`, {
			method: "POST",
			headers: {
				...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ApiLoginAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.token;
	}
}
