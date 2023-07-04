import { CORE_APIS_CONFIG } from "@core/apis/config";
import { serviceRespBodyIsNotOk } from "@core/apis/utils";
import { ServiceRespBodyIsNotOkError } from "@core/common/models/ServiceRespBodyIsNotOkError";
import { Customer_Private } from "@core/common/models/entity/backend";
import {
	ServiceAddCustomerRequestBody,
	ServiceAddToCustomerPointsRequestBody,
	ServiceUpdateCustomerRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceAddCustomerResponseBody,
	ServiceAddToCustomerPointsResponseBody,
	ServiceDeleteCustomerResponseBody,
	ServiceGetCustomerResponseBody,
	ServiceGetCustomersResponseBody,
	ServiceUpdateCustomerResponseBody,
} from "@core/services/models/responseBody";
import fetch from "node-fetch";

export class CustomerServiceClient {
	constructor(private token?: string) {}

	async getCustomers(): Promise<Customer_Private[]> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.CUSTOMER_SERVICE_ADDRESS}/customers`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetCustomersResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async addCustomer(data: ServiceAddCustomerRequestBody) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.CUSTOMER_SERVICE_ADDRESS}/customers`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceAddCustomerResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async getCustomer(customerId: number): Promise<Customer_Private> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.CUSTOMER_SERVICE_ADDRESS}/customers/${customerId}`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetCustomerResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async getCustomerByEmail(email: string): Promise<Customer_Private> {
		const resp = await fetch(
			`${
				CORE_APIS_CONFIG.CUSTOMER_SERVICE_ADDRESS
			}/customers/byEmail?email=${encodeURIComponent(email)}`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetCustomerResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async updateCustomer(
		customerId: number,
		data: ServiceUpdateCustomerRequestBody
	) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.CUSTOMER_SERVICE_ADDRESS}/customers/${customerId}`,
			{
				method: "PATCH",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceUpdateCustomerResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async deleteCustomer(customerId: number) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.CUSTOMER_SERVICE_ADDRESS}/customers/${customerId}`,
			{
				method: "DELETE",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceDeleteCustomerResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async addToCustomerPoints(
		customerId: number,
		data: ServiceAddToCustomerPointsRequestBody
	) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.CUSTOMER_SERVICE_ADDRESS}/customers/${customerId}/points`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceAddToCustomerPointsResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}
}
