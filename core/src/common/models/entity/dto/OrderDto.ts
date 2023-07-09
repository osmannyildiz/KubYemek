import { Order, OrderProduct, Product } from "../frontend";

export interface IOrderDto extends Order {
	products: {
		product: Product;
		unitCount: number;
	}[];
}

export class OrderDto {
	constructor(
		protected order: Order,
		protected orderProducts: OrderProduct[],
		protected products: Product[]
	) {}

	toObject() {
		const orderDto: IOrderDto = {
			...this.order,
			products: [],
		};

		for (const orderProduct of this.orderProducts) {
			const product = this.products.find(
				(p) => p.id === orderProduct.productId
			);

			if (!product) {
				throw new Error("Necessary product was not provided.");
			}

			orderDto.products.push({
				product,
				unitCount: orderProduct.unitCount,
			});
		}

		return orderDto;
	}
}
