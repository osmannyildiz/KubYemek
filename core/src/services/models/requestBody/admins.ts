import {
	ServiceAddEntityRequestBody,
	ServiceUpdateEntityRequestBody,
} from "./base";

export interface ServiceAddAdminRequestBody
	extends ServiceAddEntityRequestBody {
	username: string;
	email: string;
	hashedPassword: string;
}

export interface ServiceUpdateAdminRequestBody
	extends ServiceUpdateEntityRequestBody {
	username?: string;
	email?: string;
	hashedPassword?: string;
}
