import {
	ApiAddEntityRequestBody,
	ApiRequestBody,
	ApiUpdateEntityRequestBody,
} from "./base";

export interface ApiAddProductRequestBody extends ApiAddEntityRequestBody {
	name: string;
	unitOfSale: string;
	price: number;
}

export interface ApiUpdateProductRequestBody
	extends ApiUpdateEntityRequestBody {
	name?: string;
	slug?: string;
	unitOfSale?: string;
	price?: number;
}

export interface ApiProduceProductRequestBody extends ApiRequestBody {
	unitsCount: number;
}
