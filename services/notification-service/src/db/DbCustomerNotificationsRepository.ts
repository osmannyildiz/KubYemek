import { CustomerNotification_Private } from "@core/common/models/entity/backend";
import { NotificationKind } from "@core/common/models/entity/enums";
import { DbTableRepositoryBase } from "@core/services/lib/dbpkg/repository";
import type { DbconnGetter } from "@core/services/lib/dbpkg/types";

export class DbCustomerNotificationsRepository extends DbTableRepositoryBase<CustomerNotification_Private> {
	constructor(getDbconn: DbconnGetter) {
		super("customer_notifications", getDbconn);
	}

	async insert(
		customerId: number,
		createdAt: string,
		kind: NotificationKind,
		title: string,
		description: string
	): Promise<number> {
		return await this._insert(
			"customer_id,created_at,kind,title,description",
			"?,?,?,?,?",
			[customerId, createdAt, kind, title, description]
		);
	}
}
