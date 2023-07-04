import { Customer_Private } from "@core/common/models/entity/backend";
import {
	ServiceErrorResponseBody,
	ServiceSuccessResponseBody,
} from "@core/services/models/responseBody";

export type ServiceGetCustomersResponseBody =
	| ServiceSuccessResponseBody<Customer_Private[]>
	| ServiceErrorResponseBody;

export type ServiceAddCustomerResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceGetCustomerResponseBody =
	| ServiceSuccessResponseBody<Customer_Private>
	| ServiceErrorResponseBody;

export type ServiceUpdateCustomerResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceDeleteCustomerResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceAddToCustomerPointsResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;
