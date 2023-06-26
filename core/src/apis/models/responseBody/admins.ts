import {
	ApiErrorResponseBody,
	ApiSuccessResponseBody,
} from "@core/apis/models/responseBody";
import { Admin } from "@core/common/models/entity/frontend";

export type ApiGetAdminsResponseBody =
	| ApiSuccessResponseBody<Admin[]>
	| ApiErrorResponseBody;

export type ApiAddAdminResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiGetAdminResponseBody =
	| ApiSuccessResponseBody<Admin>
	| ApiErrorResponseBody;

export type ApiUpdateAdminResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;

export type ApiDeleteAdminResponseBody =
	| ApiSuccessResponseBody
	| ApiErrorResponseBody;
