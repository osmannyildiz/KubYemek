import { Entity } from "./base";

export interface OrderProduct extends Entity {
	id: number;
	orderId: number;
	productId: number;
	unitCount: number;
}
