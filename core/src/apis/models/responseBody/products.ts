import {
	ApiAddEntityResponseBody,
	ApiDeleteEntityResponseBody,
	ApiErrorResponseBody,
	ApiGetEntitiesResponseBody,
	ApiSuccessResponseBody,
	ApiUpdateEntityResponseBody,
} from "@core/apis/models/responseBody";
import { Product } from "@core/common/models/entity/frontend";

export type ApiGetProductsResponseBody = ApiGetEntitiesResponseBody<Product>;

export type ApiAddProductResponseBody = ApiAddEntityResponseBody;

export type ApiUpdateProductResponseBody = ApiUpdateEntityResponseBody;

export type ApiDeleteProductResponseBody = ApiDeleteEntityResponseBody;

export type ApiProduceProductResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;
