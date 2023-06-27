import {
	ServiceAddEntityRequestBody,
	ServiceUpdateEntityRequestBody,
} from "./base";

export interface ServiceAddProductRequestBody
	extends ServiceAddEntityRequestBody {
	name: string;
	unitOfSale: string;
	price: number;
	imageUrl?: string;
}

export interface ServiceUpdateProductRequestBody
	extends ServiceUpdateEntityRequestBody {
	name?: string;
	slug?: string;
	unitOfSale?: string;
	price?: number;
	imageUrl?: string;
}
