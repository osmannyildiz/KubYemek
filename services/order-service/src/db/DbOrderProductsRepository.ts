import { OrderProduct_Private } from "@core/common/models/entity/backend";
import { DbTableRepositoryBase } from "@core/services/lib/dbpkg/repository";
import type { DbconnGetter } from "@core/services/lib/dbpkg/types";

export class DbOrderProductsRepository extends DbTableRepositoryBase<OrderProduct_Private> {
	constructor(getDbconn: DbconnGetter) {
		super("order_products", getDbconn);
	}

	async insert(
		orderId: number,
		productId: number,
		unitCount: number
	): Promise<number> {
		return await this._insert("order_id,product_id,unit_count", "?,?,?", [
			orderId,
			productId,
			unitCount,
		]);
	}
}
