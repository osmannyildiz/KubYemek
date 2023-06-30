import { Entity } from "./base";

export interface Admin extends Entity {
	id: number;
	username: string;
	email: string;
}
