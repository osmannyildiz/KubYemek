import { AdminNotification_Private } from "@core/common/models/entity/backend";
import { NotificationKind } from "@core/common/models/entity/enums";
import { DbTableRepositoryBase } from "@core/services/lib/dbpkg/repository";
import type { DbconnGetter } from "@core/services/lib/dbpkg/types";

export class DbAdminNotificationsRepository extends DbTableRepositoryBase<AdminNotification_Private> {
	constructor(getDbconn: DbconnGetter) {
		super("admin_notifications", getDbconn);
	}

	async insert(
		createdAt: string,
		kind: NotificationKind,
		title: string,
		description: string
	): Promise<number> {
		return await this._insert("created_at,kind,title,description", "?,?,?,?", [
			createdAt,
			kind,
			title,
			description,
		]);
	}
}
