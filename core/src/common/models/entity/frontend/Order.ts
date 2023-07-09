import { OrderStatus } from "../enums";
import { Entity } from "./base";

export interface Order extends Entity {
	id: number;
	customerId: number;
	code: string;
	createdAt: string;
	status: OrderStatus;
}
