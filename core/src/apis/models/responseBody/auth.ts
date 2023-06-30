import { ApiErrorResponseBody, ApiSuccessResponseBody } from "./base";

export class ApiLoginAdminSuccessResponseBody extends ApiSuccessResponseBody {
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
