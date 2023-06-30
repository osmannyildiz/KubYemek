import {
	ApiAddEntityResponseBody,
	ApiDeleteEntityResponseBody,
	ApiErrorResponseBody,
	ApiGetEntitiesResponseBody,
	ApiGetEntityResponseBody,
	ApiSuccessResponseBody,
	ApiUpdateEntityResponseBody,
} from "@core/apis/models/responseBody";
import { Product } from "@core/common/models/entity/frontend";

export type ApiGetProductsResponseBody = ApiGetEntitiesResponseBody<Product>;

export type ApiAddProductResponseBody = ApiAddEntityResponseBody;

export type ApiGetProductResponseBody = ApiGetEntityResponseBody<Product>;

export type ApiUpdateProductResponseBody = ApiUpdateEntityResponseBody;

export type ApiDeleteProductResponseBody = ApiDeleteEntityResponseBody;

export type ApiProduceProductResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;
