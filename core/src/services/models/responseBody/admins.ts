import { Admin_Private } from "@core/common/models/entity/backend";
import {
	ServiceErrorResponseBody,
	ServiceSuccessResponseBody,
} from "@core/services/models/responseBody";

export type ServiceGetAdminsResponseBody =
	| ServiceSuccessResponseBody<Admin_Private[]>
	| ServiceErrorResponseBody;

export type ServiceAddAdminResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceGetAdminResponseBody =
	| ServiceSuccessResponseBody<Admin_Private>
	| ServiceErrorResponseBody;

export type ServiceUpdateAdminResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;

export type ServiceDeleteAdminResponseBody =
	| ServiceSuccessResponseBody
	| ServiceErrorResponseBody;
