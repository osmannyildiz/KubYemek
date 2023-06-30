import { ApiErrorResponseBody, ApiSuccessResponseBody } from "./base";

export type ApiRegisterAdminResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiLoginAdminResponseBody =
	| ApiSuccessResponseBody<any>
	| ApiErrorResponseBody;
