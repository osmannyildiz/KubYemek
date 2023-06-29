import {
	RequestHandler,
	RequestHandlerWithParams,
	RequestHandlerWithParamsAndQuery,
	RequestHandlerWithQuery,
} from "@core/common/models/express";
import { ServiceRequestBody } from "@core/services/models/requestBody";
import { ServiceResponseBody } from "@core/services/models/responseBody";

export type ServiceRequestHandler<
	TReqBody extends ServiceRequestBody | null,
	TResBody extends ServiceResponseBody
> = RequestHandler<TReqBody, TResBody>;

export type ServiceRequestHandlerWithParams<
	TReqBody extends ServiceRequestBody | null,
	TResBody extends ServiceResponseBody,
	TParamNames extends string
> = RequestHandlerWithParams<TReqBody, TResBody, TParamNames>;

export type ServiceRequestHandlerWithQuery<
	TReqBody extends ServiceRequestBody | null,
	TResBody extends ServiceResponseBody,
	TQuery
> = RequestHandlerWithQuery<TReqBody, TResBody, TQuery>;

export type ServiceRequestHandlerWithParamsAndQuery<
	TReqBody extends ServiceRequestBody | null,
	TResBody extends ServiceResponseBody,
	TParamNames extends string,
	TQuery
> = RequestHandlerWithParamsAndQuery<TReqBody, TResBody, TParamNames, TQuery>;
