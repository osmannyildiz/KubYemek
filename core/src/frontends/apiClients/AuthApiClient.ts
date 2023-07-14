import {
	ApiChangeAdminPasswordRequestBody,
	ApiChangeCustomerPasswordRequestBody,
	ApiLoginAdminRequestBody,
	ApiLoginCustomerRequestBody,
	ApiRegisterAdminRequestBody,
	ApiRegisterCustomerRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiChangeAdminPasswordResponseBody,
	ApiChangeCustomerPasswordResponseBody,
	ApiLoginAdminResponseBody,
	ApiLoginCustomerResponseBody,
	ApiRegisterAdminResponseBody,
	ApiRegisterCustomerResponseBody,
} from "@core/apis/models/responseBody";
import { CORE_FRONTENDS_CONFIG } from "@core/frontends/config";
import { ApiRespBodyIsNotOkError } from "@core/frontends/models/ApiRespBodyIsNotOkError";
import { apiRespBodyIsNotOk } from "@core/frontends/utils";

export class AuthApiClient {
	constructor(private token?: string) {}

	// ===== ADMIN =====

	async registerAdmin(data: ApiRegisterAdminRequestBody) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.AUTH_API_ADDRESS}/admins/register`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ApiRegisterAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async loginAdmin(data: ApiLoginAdminRequestBody) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.AUTH_API_ADDRESS}/admins/login`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ApiLoginAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.token;
	}

	async changeAdminPassword(data: ApiChangeAdminPasswordRequestBody) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.AUTH_API_ADDRESS}/admins/me/password`,
			{
				method: "PUT",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ApiChangeAdminPasswordResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	// ===== CUSTOMER =====

	async registerCustomer(data: ApiRegisterCustomerRequestBody) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.AUTH_API_ADDRESS}/customers/register`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ApiRegisterCustomerResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async loginCustomer(data: ApiLoginCustomerRequestBody) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.AUTH_API_ADDRESS}/customers/login`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ApiLoginCustomerResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.token;
	}

	async changeCustomerPassword(data: ApiChangeCustomerPasswordRequestBody) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.AUTH_API_ADDRESS}/customers/me/password`,
			{
				method: "PUT",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ApiChangeCustomerPasswordResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}
}
