import { NotificationKind } from "../enums";
import { Entity_Private } from "./base";

export interface CustomerNotification_Private extends Entity_Private {
	id: number;
	customer_id: number;
	created_at: string;
	kind: NotificationKind;
	title: string;
	description: string;
}
