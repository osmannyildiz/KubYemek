import { CORE_APIS_CONFIG } from "@core/apis/config";
import { serviceRespBodyIsNotOk } from "@core/apis/utils";
import { ServiceRespBodyIsNotOkError } from "@core/common/models/ServiceRespBodyIsNotOkError";
import { Order_Private } from "@core/common/models/entity/backend";
import { ServiceAddOrderRequestBody } from "@core/services/models/requestBody";
import {
	ServiceAddOrderResponseBody,
	ServiceCancelOrderResponseBody,
	ServiceGetOrderDtoResponseBody,
	ServiceGetOrderDtosResponseBody,
	ServiceGetOrderResponseBody,
	ServiceGetOrdersResponseBody,
} from "@core/services/models/responseBody";
import fetch from "node-fetch";
import { IOrderDto_Private } from "../models/entity/dto/OrderDto_Private";

export class OrderServiceClient {
	constructor(private token?: string) {}

	async getOrders(): Promise<Order_Private[]> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.ORDER_SERVICE_ADDRESS}/orders`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetOrdersResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async getOrderDtos(): Promise<IOrderDto_Private[]> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.ORDER_SERVICE_ADDRESS}/orders/dto`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetOrderDtosResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async addOrder(data: ServiceAddOrderRequestBody) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.ORDER_SERVICE_ADDRESS}/orders`,
			{
				method: "POST",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const respBody: ServiceAddOrderResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}

	async getOrder(orderId: number): Promise<Order_Private> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.ORDER_SERVICE_ADDRESS}/orders/${orderId}`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetOrderResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async getOrderDto(orderId: number): Promise<IOrderDto_Private> {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.ORDER_SERVICE_ADDRESS}/orders/${orderId}/dto`,
			{
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceGetOrderDtoResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}

		return respBody.data;
	}

	async cancelOrder(orderId: number) {
		const resp = await fetch(
			`${CORE_APIS_CONFIG.ORDER_SERVICE_ADDRESS}/orders/${orderId}`,
			{
				method: "DELETE",
				headers: {
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
				},
			}
		);
		const respBody: ServiceCancelOrderResponseBody = await resp.json();

		if (serviceRespBodyIsNotOk(respBody)) {
			throw new ServiceRespBodyIsNotOkError(resp, respBody);
		}
	}
}
