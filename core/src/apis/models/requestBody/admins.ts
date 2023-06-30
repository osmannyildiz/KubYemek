import { ApiUpdateEntityRequestBody } from "./base";

export interface ApiUpdateAdminRequestBody extends ApiUpdateEntityRequestBody {
	username?: string;
	email?: string;
}
