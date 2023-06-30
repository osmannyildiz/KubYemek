import { Entity_Private } from "./base";

export interface Admin_Private extends Entity_Private {
	id: number;
	username: string;
	email: string;
	hashed_password: string;
}
