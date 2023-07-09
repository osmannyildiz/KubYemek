import { ServiceAddEntityRequestBody } from "./base";

export interface ServiceAddOrderRequestBody
	extends ServiceAddEntityRequestBody {
	products: {
		productId: number;
		unitCount: number;
	}[];
}
