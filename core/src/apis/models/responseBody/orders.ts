import {
	ApiErrorResponseBody,
	ApiGetEntitiesResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { IOrderDto } from "@core/common/models/entity/dto/OrderDto";

export type ApiGetOrdersResponseBody = ApiGetEntitiesResponseBody<IOrderDto>;

export type ApiCancelOrderResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;
