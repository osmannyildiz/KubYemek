import { IOrderDto } from "@core/common/models/entity/dto/OrderDto";
import { IOrderDto_Private } from "@core/common/models/entity/dto/OrderDto_Private";
import { CustomerAdapter } from "./CustomerAdapter";
import { ProductAdapter } from "./ProductAdapter";

export class OrderDtoAdapter {
	static privateToPublic(privOrderDto: IOrderDto_Private): IOrderDto {
		const customer = CustomerAdapter.privateToPublic(privOrderDto.customer);

		const products = privOrderDto.products.map((podp) => ({
			product: ProductAdapter.privateToPublic(podp.product),
			unitCount: podp.unit_count,
		}));

		return {
			id: privOrderDto.id,
			customerId: privOrderDto.customer_id,
			code: privOrderDto.code,
			createdAt: privOrderDto.created_at,
			status: privOrderDto.status,
			customer,
			products,
		};
	}
}
