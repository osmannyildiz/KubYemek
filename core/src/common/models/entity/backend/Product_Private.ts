import { Entity_Private } from "./base";

export interface Product_Private extends Entity_Private {
	id: number;
	name: string;
	slug: string;
	unit_of_sale: string;
	price: number;
	units_in_stock: number;
	image_url: string;
}
