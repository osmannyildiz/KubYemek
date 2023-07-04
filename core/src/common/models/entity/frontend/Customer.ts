import { Entity } from "./base";

export interface Customer extends Entity {
	id: number;
	email: string;
	name: string;
	surname: string;
	deliveryAddress: string;
	birthDate: string;
	points: number;
}
