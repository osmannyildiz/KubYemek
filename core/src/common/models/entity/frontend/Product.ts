import { Entity } from "./base";

export interface Product extends Entity {
	id: number;
	name: string;
	slug: string;
	unitOfSale: string;
	price: number;
	unitsInStock: number;
	imageUrl: string;
}
