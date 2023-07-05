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

export interface ApiRegisterCustomerRequestBody
	extends ApiAddEntityRequestBody {
	email: string;
	password: string;
	name: string;
	surname: string;
	deliveryAddress: string;
	birthDate: string;
}

export interface ApiLoginCustomerRequestBody extends ApiAddEntityRequestBody {
	email: string;
	password: string;
}

export interface ApiChangeCustomerPasswordRequestBody
	extends ApiAddEntityRequestBody {
	currentPassword: string;
	newPassword: string;
}
