import type {
	RequestHandler as ExpressRequestHandler,
	ParamsDictionary,
	Query,
} from "express-serve-static-core";

type TParamsDefault = ParamsDictionary;
type TQueryDefault = Query;
type TLocalsDefault = Record<string, any>;

type TRecordWithConstStringKeys<TKeys extends string> = Record<TKeys, string>;

export type RequestHandler<TReqBody, TResBody> = ExpressRequestHandler<
	TParamsDefault,
	TResBody,
	TReqBody,
	TQueryDefault,
	TLocalsDefault
>;

export type RequestHandlerWithParams<
	TReqBody,
	TResBody,
	TParamNames extends string
> = ExpressRequestHandler<
	TRecordWithConstStringKeys<TParamNames>,
	TResBody,
	TReqBody,
	TQueryDefault,
	TLocalsDefault
>;

export type RequestHandlerWithQuery<TReqBody, TResBody, TQuery> =
	ExpressRequestHandler<
		TParamsDefault,
		TResBody,
		TReqBody,
		TQuery,
		TLocalsDefault
	>;

export type RequestHandlerWithParamsAndQuery<
	TReqBody,
	TResBody,
	TParamNames extends string,
	TQuery
> = ExpressRequestHandler<
	TRecordWithConstStringKeys<TParamNames>,
	TResBody,
	TReqBody,
	TQuery,
	TLocalsDefault
>;
