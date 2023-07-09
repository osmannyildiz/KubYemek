import { OrderStatus } from "../enums";
import { Entity_Private } from "./base";

export interface Order_Private extends Entity_Private {
	id: number;
	customer_id: number;
	code: string;
	created_at: string;
	status: OrderStatus;
}
