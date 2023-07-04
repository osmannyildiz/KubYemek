import { ApiRequestBody } from "./base";

export interface ApiAddToCustomerPointsRequestBody extends ApiRequestBody {
	points: number;
}
