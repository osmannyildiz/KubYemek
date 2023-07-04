import { CORE_APIS_CONFIG } from "@core/apis/config";
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
	constructor(private token?: string) {}

	async getProducts(): Promise<Product_Private[]> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.PRODUCT_SERVICE_ADDRESS}/products`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetProductsResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async addProduct(formData: FormData) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.PRODUCT_SERVICE_ADDRESS}/products`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					...formData.getHeaders(),
				},
				body: formData,
			}
		);
		const respBody: ServiceAddProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async getProduct(productId: number): Promise<Product_Private> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.PRODUCT_SERVICE_ADDRESS}/products/${productId}`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async updateProduct(productId: number, formData: FormData) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.PRODUCT_SERVICE_ADDRESS}/products/${productId}`,
			{
				method: "PATCH",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					...formData.getHeaders(),
				},
				body: formData,
			}
		);
		const respBody: ServiceUpdateProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async deleteProduct(productId: number) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.PRODUCT_SERVICE_ADDRESS}/products/${productId}`,
			{
				method: "DELETE",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceDeleteProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async produceProduct(
		productId: number,
		data: ServiceProduceProductRequestBody
	) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.PRODUCT_SERVICE_ADDRESS}/products/${productId}/produce`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceProduceProductResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}
}
