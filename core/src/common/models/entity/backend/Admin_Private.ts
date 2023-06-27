import { Entity_Private } from "./base";

export interface Admin_Private extends Entity_Private {
	id: number;
	email: string;
	password: string;
}
