import {
	ServiceAddEntityRequestBody,
	ServiceUpdateEntityRequestBody,
} from "./base";

export interface ServiceAddAdminRequestBody
	extends ServiceAddEntityRequestBody {
	email: string;
	password: string;
}

export interface ServiceUpdateAdminRequestBody
	extends ServiceUpdateEntityRequestBody {
	email?: string;
	password?: string;
}
