import { NotificationKind } from "../enums";
import { Entity_Private } from "./base";

export interface AdminNotification_Private extends Entity_Private {
	id: number;
	created_at: string;
	kind: NotificationKind;
	title: string;
	description: string;
}
