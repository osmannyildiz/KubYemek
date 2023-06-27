import { Product_Private } from "@core/common/models/entity/backend";
import {
	ServiceAddEntityResponseBody,
	ServiceDeleteEntityResponseBody,
	ServiceGetEntitiesResponseBody,
	ServiceGetEntityResponseBody,
	ServiceUpdateEntityResponseBody,
} from "@core/services/models/responseBody";

export type ServiceGetProductsResponseBody =
	ServiceGetEntitiesResponseBody<Product_Private>;

export type ServiceAddProductResponseBody = ServiceAddEntityResponseBody;

export type ServiceGetProductResponseBody =
	ServiceGetEntityResponseBody<Product_Private>;

export type ServiceUpdateProductResponseBody = ServiceUpdateEntityResponseBody;

export type ServiceDeleteProductResponseBody = ServiceDeleteEntityResponseBody;
