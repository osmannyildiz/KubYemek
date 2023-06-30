import { ApiAddEntityRequestBody } from "./base";

export interface ApiRegisterAdminRequestBody extends ApiAddEntityRequestBody {
	email: string;
	password: string;
}

export interface ApiLoginAdminRequestBody extends ApiAddEntityRequestBody {
	email: string;
	password: string;
}
