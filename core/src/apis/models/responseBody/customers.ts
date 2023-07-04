import {
	ApiErrorResponseBody,
	ApiGetEntitiesResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { Customer } from "@core/common/models/entity/frontend";

export type ApiGetCustomersResponseBody = ApiGetEntitiesResponseBody<Customer>;

export type ApiAddToCustomerPointsResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;
