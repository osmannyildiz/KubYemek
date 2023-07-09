import { Entity_Private } from "./base";

export interface OrderProduct_Private extends Entity_Private {
	id: number;
	order_id: number;
	product_id: number;
	unit_count: number;
}
