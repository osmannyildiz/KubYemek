import { ApiUpdateEntityRequestBody } from "./base";

export interface ApiUpdateAdminRequestBody extends ApiUpdateEntityRequestBody {
	email?: string;
}
