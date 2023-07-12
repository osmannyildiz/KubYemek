import { NotificationKind } from "@core/common/models/entity/enums";
import { ServiceAddEntityRequestBody } from "./base";

export interface ServiceAddAdminNotificationRequestBody
	extends ServiceAddEntityRequestBody {
	kind: NotificationKind;
	title: string;
	description: string;
}

export interface ServiceAddCustomerNotificationRequestBody
	extends ServiceAddEntityRequestBody {
	kind: NotificationKind;
	title: string;
	description: string;
}
