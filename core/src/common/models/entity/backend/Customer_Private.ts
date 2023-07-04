import { Entity_Private } from "./base";

export interface Customer_Private extends Entity_Private {
	id: number;
	email: string;
	hashed_password: string;
	name: string;
	surname: string;
	delivery_address: string;
	birth_date: string;
	points: number;
}
