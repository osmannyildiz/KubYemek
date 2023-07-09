import { Order_Private } from "@core/common/models/entity/backend";
import { IOrderDto_Private } from "@core/common/models/entity/dto/OrderDto_Private";
import {
	ServiceErrorResponseBody,
	ServiceSuccessResponseBody,
} from "@core/services/models/responseBody";

export type ServiceGetOrdersResponseBody =
	| ServiceSuccessResponseBody<Order_Private[]>
	| ServiceErrorResponseBody;

export type ServiceAddOrderResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceGetOrderResponseBody =
	| ServiceSuccessResponseBody<Order_Private>
	| ServiceErrorResponseBody;

export type ServiceCancelOrderResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceGetOrderDtosResponseBody =
	| ServiceSuccessResponseBody<IOrderDto_Private[]>
	| ServiceErrorResponseBody;

export type ServiceGetOrderDtoResponseBody =
	| ServiceSuccessResponseBody<IOrderDto_Private>
	| ServiceErrorResponseBody;
