import {
	ServiceAddEntityRequestBody,
	ServiceUpdateEntityRequestBody,
} from "./base";

export interface ServiceAddCustomerRequestBody
	extends ServiceAddEntityRequestBody {
	email: string;
	hashedPassword: string;
	name: string;
	surname: string;
	deliveryAddress: string;
	birthDate: string;
}

export interface ServiceUpdateCustomerRequestBody
	extends ServiceUpdateEntityRequestBody {
	email?: string;
	hashedPassword?: string;
	name?: string;
	surname?: string;
	deliveryAddress?: string;
	birthDate?: string;
	points?: number;
}

export interface ServiceAddToCustomerPointsRequestBody
	extends ServiceUpdateEntityRequestBody {
	points: number;
}
