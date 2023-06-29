import {
	ApiAddAdminRequestBody,
	ApiUpdateAdminRequestBody,
} from "@core/apis/models/requestBody";
import {
	ApiAddAdminResponseBody,
	ApiAddProductResponseBody,
	ApiDeleteAdminResponseBody,
	ApiDeleteProductResponseBody,
	ApiGetAdminResponseBody,
	ApiGetAdminsResponseBody,
	ApiGetProductResponseBody,
	ApiGetProductsResponseBody,
	ApiUpdateAdminResponseBody,
	ApiUpdateProductResponseBody,
} from "@core/apis/models/responseBody";
import { Admin, Product } from "@core/common/models/entity/frontend";
import { CONFIG } from "@core/frontends/config";
import { ApiRespBodyIsNotOkError } from "@core/frontends/models/ApiRespBodyIsNotOkError";
import { apiRespBodyIsNotOk } from "@core/frontends/utils";

export class AdminApiClient {
	static async getAdmins(): Promise<Admin[]> {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/admins`);
		const respBody: ApiGetAdminsResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}

		return respBody.data;
	}

	static async addAdmin(data: ApiAddAdminRequestBody) {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/admins`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ApiAddAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}
	}

	static async getAdmin(adminId: number): Promise<Admin> {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/admins/${adminId}`);
		const respBody: ApiGetAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}

		return respBody.data;
	}

	static async updateAdmin(adminId: number, data: ApiUpdateAdminRequestBody) {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/admins/${adminId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ApiUpdateAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}
	}

	static async deleteAdmin(adminId: number) {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/admins/${adminId}`, {
			method: "DELETE",
		});
		const respBody: ApiDeleteAdminResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}
	}

	static async getProducts(): Promise<Product[]> {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/products`);
		const respBody: ApiGetProductsResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}

		return respBody.data;
	}

	static async addProduct(formData: FormData) {
		const resp = await fetch(`${CONFIG.ADMIN_API_ADDRESS}/products`, {
			method: "POST",
			body: formData,
		});
		const respBody: ApiAddProductResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}
	}

	static async getProduct(productId: number): Promise<Product> {
		const resp = await fetch(
			`${CONFIG.ADMIN_API_ADDRESS}/products/${productId}`
		);
		const respBody: ApiGetProductResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}

		return respBody.data;
	}

	static async updateProduct(productId: number, formData: FormData) {
		const resp = await fetch(
			`${CONFIG.ADMIN_API_ADDRESS}/products/${productId}`,
			{
				method: "PATCH",
				body: formData,
			}
		);
		const respBody: ApiUpdateProductResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}
	}

	static async deleteProduct(productId: number) {
		const resp = await fetch(
			`${CONFIG.ADMIN_API_ADDRESS}/products/${productId}`,
			{
				method: "DELETE",
			}
		);
		const respBody: ApiDeleteProductResponseBody = await resp.json();

		if (apiRespBodyIsNotOk(respBody)) {
			throw new ApiRespBodyIsNotOkError(respBody.errorType);
		}
	}
}
