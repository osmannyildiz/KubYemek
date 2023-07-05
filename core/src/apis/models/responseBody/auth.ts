import { ApiErrorResponseBody, ApiSuccessResponseBody } from "./base";

export class ApiLoginAdminSuccessResponseBody extends ApiSuccessResponseBody {
	constructor(public token: string) {
		super(undefined);
	}
}

export class ApiLoginCustomerSuccessResponseBody extends ApiSuccessResponseBody {
	constructor(public token: string) {
		super(undefined);
	}
}

export type ApiRegisterAdminResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiLoginAdminResponseBody =
	| ApiLoginAdminSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiChangeAdminPasswordResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiRegisterCustomerResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiLoginCustomerResponseBody =
	| ApiLoginCustomerSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiChangeCustomerPasswordResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;
