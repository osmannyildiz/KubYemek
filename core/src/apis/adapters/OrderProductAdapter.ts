import { OrderProduct_Private } from "@core/common/models/entity/backend";
import { OrderProduct } from "@core/common/models/entity/frontend";

export class OrderProductAdapter {
	static privateToPublic(privOrderProduct: OrderProduct_Private): OrderProduct {
		return {
			id: privOrderProduct.id,
			orderId: privOrderProduct.order_id,
			productId: privOrderProduct.product_id,
			unitCount: privOrderProduct.unit_count,
		};
	}
}
