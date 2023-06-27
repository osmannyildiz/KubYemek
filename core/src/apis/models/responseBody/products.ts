import {
	ApiAddEntityResponseBody,
	ApiDeleteEntityResponseBody,
	ApiGetEntitiesResponseBody,
	ApiGetEntityResponseBody,
	ApiUpdateEntityResponseBody,
} from "@core/apis/models/responseBody";
import { Product } from "@core/common/models/entity/frontend";

export type ApiGetProductsResponseBody = ApiGetEntitiesResponseBody<Product>;

export type ApiAddProductResponseBody = ApiAddEntityResponseBody;

export type ApiGetProductResponseBody = ApiGetEntityResponseBody<Product>;

export type ApiUpdateProductResponseBody = ApiUpdateEntityResponseBody;

export type ApiDeleteProductResponseBody = ApiDeleteEntityResponseBody;
