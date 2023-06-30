import {
	ServiceAddEntityRequestBody,
	ServiceUpdateEntityRequestBody,
} from "./base";

export interface ServiceAddAdminRequestBody
	extends ServiceAddEntityRequestBody {
	email: string;
	hashedPassword: string;
}

export interface ServiceUpdateAdminRequestBody
	extends ServiceUpdateEntityRequestBody {
	email?: string;
	hashedPassword?: string;
}
