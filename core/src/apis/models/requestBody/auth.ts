import { ApiAddEntityRequestBody } from "./base";

export interface ApiRegisterAdminRequestBody extends ApiAddEntityRequestBody {
	username: string;
	email: string;
	password: string;
}

export interface ApiLoginAdminRequestBody extends ApiAddEntityRequestBody {
	email: string;
	password: string;
}

export interface ApiChangeAdminPasswordRequestBody
	extends ApiAddEntityRequestBody {
	currentPassword: string;
	newPassword: string;
}
