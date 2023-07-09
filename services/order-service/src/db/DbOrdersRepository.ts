import { Order_Private } from "@core/common/models/entity/backend";
import { OrderStatus } from "@core/common/models/entity/enums";
import { DbTableRepositoryBase } from "@core/services/lib/dbpkg/repository";
import type { DbconnGetter } from "@core/services/lib/dbpkg/types";

export class DbOrdersRepository extends DbTableRepositoryBase<Order_Private> {
	constructor(getDbconn: DbconnGetter) {
		super("orders", getDbconn);
	}

	async insert(
		customerId: number,
		code: string,
		createdAt: string,
		status: OrderStatus
	): Promise<number> {
		return await this._insert("customer_id,code,created_at,status", "?,?,?,?", [
			customerId,
			code,
			createdAt,
			status,
		]);
	}
}
