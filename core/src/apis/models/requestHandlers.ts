import { ApiRequestBody } from "@core/apis/models/requestBody";
import { ApiResponseBody } from "@core/apis/models/responseBody";
import {
	RequestHandler,
	RequestHandlerWithParams,
	RequestHandlerWithParamsAndQuery,
	RequestHandlerWithQuery,
} from "@core/common/models/express";

export type ApiRequestHandler<
	TReqBody extends ApiRequestBody | null,
	TResBody extends ApiResponseBody
> = RequestHandler<TReqBody, TResBody>;

export type ApiRequestHandlerWithParams<
	TReqBody extends ApiRequestBody | null,
	TResBody extends ApiResponseBody,
	TParamNames extends string
> = RequestHandlerWithParams<TReqBody, TResBody, TParamNames>;

export type ApiRequestHandlerWithQuery<
	TReqBody extends ApiRequestBody | null,
	TResBody extends ApiResponseBody,
	TQuery
> = RequestHandlerWithQuery<TReqBody, TResBody, TQuery>;

export type ApiRequestHandlerWithParamsAndQuery<
	TReqBody extends ApiRequestBody | null,
	TResBody extends ApiResponseBody,
	TParamNames extends string,
	TQuery
> = RequestHandlerWithParamsAndQuery<TReqBody, TResBody, TParamNames, TQuery>;
