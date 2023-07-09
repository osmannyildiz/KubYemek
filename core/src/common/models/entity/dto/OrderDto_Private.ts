import {
	Customer_Private,
	Order_Private,
	OrderProduct_Private,
	Product_Private,
} from "../backend";

export interface IOrderDto_Private extends Order_Private {
	customer: Customer_Private;
	products: {
		product: Product_Private;
		unit_count: number;
	}[];
}

export class OrderDto_Private {
	constructor(
		protected order: Order_Private,
		protected customer: Customer_Private,
		protected orderProducts: OrderProduct_Private[],
		protected products: Product_Private[]
	) {}

	toObject() {
		const orderDto: IOrderDto_Private = {
			...this.order,
			customer: this.customer,
			products: [],
		};

		for (const orderProduct of this.orderProducts) {
			const product = this.products.find(
				(p) => p.id === orderProduct.product_id
			);

			if (!product) {
				throw new Error("Necessary product was not provided.");
			}

			orderDto.products.push({
				product,
				unit_count: orderProduct.unit_count,
			});
		}

		return orderDto;
	}
}
