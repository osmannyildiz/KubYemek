import {
	ApiAddToCustomerPointsRequestBody,
	ApiProduceProductRequestBody,
	ApiUpdateAdminRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiAddProductResponseBody,
	ApiAddToCustomerPointsResponseBody,
	ApiDeleteAdminResponseBody,
	ApiDeleteProductResponseBody,
	ApiGetAdminsResponseBody,
	ApiGetCustomersResponseBody,
	ApiGetProductsResponseBody,
	ApiProduceProductResponseBody,
	ApiUpdateAdminResponseBody,
	ApiUpdateProductResponseBody,
} from "@core/apis/models/responseBody";
import { Admin, Customer, Product } from "@core/common/models/entity/frontend";
import { CORE_FRONTENDS_CONFIG } from "@core/frontends/config";
import { ApiRespBodyIsNotOkError } from "@core/frontends/models/ApiRespBodyIsNotOkError";
import { apiRespBodyIsNotOk } from "@core/frontends/utils";

export class AdminApiClient {
	constructor(private token?: string) {}

	async getAdmins(): Promise<Admin[]> {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/admins`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ApiGetAdminsResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	// async getAdmin(adminId: number): Promise<Admin> {
	// 	const resp = await fetch(`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/admins/${adminId}`, {
	// 		headers: {
	// 			...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
	// 		},
	// 	});
	// 	const respBody: ApiGetAdminResponseBody = await resp.json();

	// 	if (apiRespBodyIsNotOk(respBody)) {
	// 		throw new ApiRespBodyIsNotOkError(resp, respBody);
	// 	}

	// 	return respBody.data;
	// }

	async updateAdmin(adminId: number, data: ApiUpdateAdminRequestBody) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/admins/${adminId}`,
			{
				method: "PATCH",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ApiUpdateAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async deleteAdmin(adminId: number) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/admins/${adminId}`,
			{
				method: "DELETE",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ApiDeleteAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async getCustomers(): Promise<Customer[]> {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/customers`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ApiGetCustomersResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async addToCustomerPoints(
		customerId: number,
		data: ApiAddToCustomerPointsRequestBody
	) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/customers/${customerId}/points`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ApiAddToCustomerPointsResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async getProducts(): Promise<Product[]> {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/products`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ApiGetProductsResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async addProduct(formData: FormData) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/products`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
				body: formData,
			}
		);
		const respBody: ApiAddProductResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	// async getProduct(productId: number): Promise<Product> {
	// 	const resp = await fetch(
	// 		`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/products/${productId}`,
	// 		{
	// 			headers: {
	// 				...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
	// 			},
	// 		}
	// 	);
	// 	const respBody: ApiGetProductResponseBody = await resp.json();

	// 	if (apiRespBodyIsNotOk(respBody)) {
	// 		throw new ApiRespBodyIsNotOkError(resp, respBody);
	// 	}

	// 	return respBody.data;
	// }

	async updateProduct(productId: number, formData: FormData) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/products/${productId}`,
			{
				method: "PATCH",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
				body: formData,
			}
		);
		const respBody: ApiUpdateProductResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async deleteProduct(productId: number) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/products/${productId}`,
			{
				method: "DELETE",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ApiDeleteProductResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async produceProduct(productId: number, data: ApiProduceProductRequestBody) {
		const resp = await fetch(
			`${CORE_FRONTENDS_CONFIG.ADMIN_API_ADDRESS}/products/${productId}/produce`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ApiProduceProductResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}
}
