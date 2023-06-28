import { CONFIG } from "@core/apis/config";
import { serviceRespBodyIsNotOk } from "@core/apis/utils";
import { ServiceRespBodyIsNotOkError } from "@core/common/models/ServiceRespBodyIsNotOkError";
import { Product_Private } from "@core/common/models/entity/backend";
import {
	ServiceAddProductRequestBody,
	ServiceUpdateProductRequestBody,
} from "@core/services/models/requestBody";
import {
	ServiceAddProductResponseBody,
	ServiceDeleteProductResponseBody,
	ServiceGetProductResponseBody,
	ServiceGetProductsResponseBody,
	ServiceUpdateProductResponseBody,
} from "@core/services/models/responseBody";
import fetch from "node-fetch";

export class ProductServiceClient {
	static async getProducts(): Promise<Product_Private[]> {
		const resp = await fetch(`${CONFIG.PRODUCT_SERVICE_ADDRESS}/products`);
		const respBody: ServiceGetProductsResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}

		return respBody.data;
	}

	static async addProduct(data: ServiceAddProductRequestBody) {
		const resp = await fetch(`${CONFIG.PRODUCT_SERVICE_ADDRESS}/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const respBody: ServiceAddProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}
	}

	static async getProduct(productId: number): Promise<Product_Private> {
		const resp = await fetch(
			`${CONFIG.PRODUCT_SERVICE_ADDRESS}/products/${productId}`
		);
		const respBody: ServiceGetProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}

		return respBody.data;
	}

	static async updateProduct(
		productId: number,
		data: ServiceUpdateProductRequestBody
	) {
		const resp = await fetch(
			`${CONFIG.PRODUCT_SERVICE_ADDRESS}/products/${productId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceUpdateProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}
	}

	static async deleteProduct(productId: number) {
		const resp = await fetch(
			`${CONFIG.PRODUCT_SERVICE_ADDRESS}/products/${productId}`,
			{
				method: "DELETE",
			}
		);
		const respBody: ServiceDeleteProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}
	}
}
