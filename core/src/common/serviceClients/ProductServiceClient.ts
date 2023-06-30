import { CONFIG } from "@core/apis/config";
import { serviceRespBodyIsNotOk } from "@core/apis/utils";
import { ServiceRespBodyIsNotOkError } from "@core/common/models/ServiceRespBodyIsNotOkError";
import { Product_Private } from "@core/common/models/entity/backend";
import { ServiceProduceProductRequestBody } from "@core/services/models/requestBody";
import {
	ServiceAddProductResponseBody,
	ServiceDeleteProductResponseBody,
	ServiceGetProductResponseBody,
	ServiceGetProductsResponseBody,
	ServiceProduceProductResponseBody,
	ServiceUpdateProductResponseBody,
} from "@core/services/models/responseBody";
import FormData from "form-data";
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

	static async addProduct(formData: FormData) {
		const resp = await fetch(`${CONFIG.PRODUCT_SERVICE_ADDRESS}/products`, {
			method: "POST",
			headers: {
				...formData.getHeaders(),
			},
			body: formData,
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

	static async updateProduct(productId: number, formData: FormData) {
		const resp = await fetch(
			`${CONFIG.PRODUCT_SERVICE_ADDRESS}/products/${productId}`,
			{
				method: "PATCH",
				headers: {
					...formData.getHeaders(),
				},
				body: formData,
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

	static async produceProduct(
		productId: number,
		data: ServiceProduceProductRequestBody
	) {
		const resp = await fetch(
			`${CONFIG.PRODUCT_SERVICE_ADDRESS}/products/${productId}/produce`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceProduceProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(respBody.errorType);
		}
	}
}
