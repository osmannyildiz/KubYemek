import {
	ApiAddEntityResponseBody,
	ApiDeleteEntityResponseBody,
	ApiGetEntitiesResponseBody,
	ApiUpdateEntityResponseBody,
} from "@core/apis/models/responseBody";
import { Admin } from "@core/common/models/entity/frontend";

export type ApiGetAdminsResponseBody = ApiGetEntitiesResponseBody<Admin>;

export type ApiAddAdminResponseBody = ApiAddEntityResponseBody;

export type ApiUpdateAdminResponseBody = ApiUpdateEntityResponseBody;

export type ApiDeleteAdminResponseBody = ApiDeleteEntityResponseBody;
