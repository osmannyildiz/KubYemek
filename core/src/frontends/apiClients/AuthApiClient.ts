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
	static async registerAdmin(data: ApiRegisterAdminRequestBody) {
		const resp = await fetch(`${CONFIG.AUTH_API_ADDRESS}/admins/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ApiRegisterAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	static async loginAdmin(data: ApiLoginAdminRequestBody) {
		const resp = await fetch(`${CONFIG.AUTH_API_ADDRESS}/admins/login`, {
			method: "POST",
			headers: {
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
