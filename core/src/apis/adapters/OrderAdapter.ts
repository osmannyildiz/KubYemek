import { Order_Private } from "@core/common/models/entity/backend";
import { Order } from "@core/common/models/entity/frontend";

export class OrderAdapter {
	static privateToPublic(privOrder: Order_Private): Order {
		return {
			id: privOrder.id,
			customerId: privOrder.customer_id,
			code: privOrder.code,
			createdAt: privOrder.created_at,
			status: privOrder.status,
		};
	}
}
