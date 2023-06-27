import {
	ApiAddEntityResponseBody,
	ApiDeleteEntityResponseBody,
	ApiGetEntitiesResponseBody,
	ApiGetEntityResponseBody,
	ApiUpdateEntityResponseBody,
} from "@core/apis/models/responseBody";
import { Admin } from "@core/common/models/entity/frontend";

export type ApiGetAdminsResponseBody = ApiGetEntitiesResponseBody<Admin>;

export type ApiAddAdminResponseBody = ApiAddEntityResponseBody;

export type ApiGetAdminResponseBody = ApiGetEntityResponseBody<Admin>;

export type ApiUpdateAdminResponseBody = ApiUpdateEntityResponseBody;

export type ApiDeleteAdminResponseBody = ApiDeleteEntityResponseBody;
