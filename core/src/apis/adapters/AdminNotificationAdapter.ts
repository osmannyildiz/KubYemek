import { AdminNotification_Private } from "@core/common/models/entity/backend";
import { AdminNotification } from "@core/common/models/entity/frontend";

export class AdminNotificationAdapter {
	static privateToPublic(
		privAdminNotification: AdminNotification_Private
	): AdminNotification {
		return {
			id: privAdminNotification.id,
			createdAt: privAdminNotification.created_at,
			kind: privAdminNotification.kind,
			title: privAdminNotification.title,
			description: privAdminNotification.description,
		};
	}
}
