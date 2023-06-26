import { ApiAddEntityRequestBody, ApiUpdateEntityRequestBody } from "./base";

export interface ApiAddAdminRequestBody extends ApiAddEntityRequestBody {
	email: string;
	password: string;
}

export interface ApiUpdateAdminRequestBody extends ApiUpdateEntityRequestBody {
	email?: string;
	password?: string;
}
