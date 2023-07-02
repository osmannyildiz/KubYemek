import {
	ApiProduceProductRequestBody,
	ApiUpdateAdminRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiAddProductResponseBody,
	ApiDeleteAdminResponseBody,
	ApiDeleteProductResponseBody,
	ApiGetAdminsResponseBody,
	ApiGetProductsResponseBody,
	ApiProduceProductResponseBody,
	ApiUpdateAdminResponseBody,
	ApiUpdateProductResponseBody,
} from "@core/apis/models/responseBody";
import { Admin, Product } from "@core/common/models/entity/frontend";
import { CONFIG } from "@core/frontends/config";
import { ApiRespBodyIsNotOkError } from "@core/frontends/models/ApiRespBodyIsNotOkError";
import { apiRespBodyIsNotOk } from "@core/frontends/utils";

export class AdminApiClient {
	constructor(private token: string) {}

	async getAdmins(): Promise<Admin[]> {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/admins`, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});
		const respBody: ApiGetAdminsResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	// async getAdmin(adminId: number): Promise<Admin> {
	// 	const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/admins/${adminId}`, {
	// 		headers: {
	// 			Authorization: `Bearer ${this.token}`,
	// 		},
	// 	});
	// 	const respBody: ApiGetAdminResponseBody = await resp.json();

	// 	if (apiRespBodyIsNotOk(respBody)) {
	// 		throw new ApiRespBodyIsNotOkError(resp, respBody);
	// 	}

	// 	return respBody.data;
	// }

	async updateAdmin(adminId: number, data: ApiUpdateAdminRequestBody) {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/admins/${adminId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${this.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ApiUpdateAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async deleteAdmin(adminId: number) {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/admins/${adminId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});
		const respBody: ApiDeleteAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	async getProducts(): Promise<Product[]> {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/products`, {
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
		});
		const respBody: ApiGetProductsResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async addProduct(formData: FormData) {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/products`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${this.token}`,
			},
			body: formData,
		});
		const respBody: ApiAddProductResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(resp, respBody);
		}
	}

	// async getProduct(productId: number): Promise<Product> {
	// 	const resp = await fetch(
	// 		`${CONFIG.ADMIN_API_ADDRESS}/products/${productId}`,
	// 		{
	// 			headers: {
	// 				Authorization: `Bearer ${this.token}`,
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
			`${CONFIG.ADMIN_API_ADDRESS}/products/${productId}`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${this.token}`,
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
			`${CONFIG.ADMIN_API_ADDRESS}/products/${productId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${this.token}`,
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
			`${CONFIG.ADMIN_API_ADDRESS}/products/${productId}/produce`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${this.token}`,
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
