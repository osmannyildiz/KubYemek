import { ParseJwtRequestExtension } from "@core/common/middlewares/parseJwt";
import { NextFunction, Request, Response } from "express";
import type { ParamsDictionary, Query } from "express-serve-static-core";

type TParamsDefault = ParamsDictionary;
type TQueryDefault = Query;
type TLocalsDefault = Record<string, any>;
interface MyExpressRequestHandler<
	P = TParamsDefault,
	ResBody = any,
	ReqBody = any,
	ReqQuery = TQueryDefault,
	LocalsObj extends Record<string, any> = TLocalsDefault
> {
	(
		req: Request<P, ResBody, ReqBody, ReqQuery, LocalsObj> &
			ParseJwtRequestExtension,
		res: Response<ResBody, LocalsObj>,
		next: NextFunction
	): void;
}

type TRecordWithConstStringKeys<TKeys extends string> = Record<TKeys, string>;

export type RequestHandler<TReqBody, TResBody> = MyExpressRequestHandler<
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
> = MyExpressRequestHandler<
	TRecordWithConstStringKeys<TParamNames>,
	TResBody,
	TReqBody,
	TQueryDefault,
	TLocalsDefault
>;

export type RequestHandlerWithQuery<TReqBody, TResBody, TQuery> =
	MyExpressRequestHandler<
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
> = MyExpressRequestHandler<
	TRecordWithConstStringKeys<TParamNames>,
	TResBody,
	TReqBody,
	TQuery,
	TLocalsDefault
>;
