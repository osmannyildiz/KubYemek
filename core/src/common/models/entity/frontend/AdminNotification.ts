import { NotificationKind } from "../enums";
import { Entity } from "./base";

export interface AdminNotification extends Entity {
	id: number;
	createdAt: string;
	kind: NotificationKind;
	title: string;
	description: string;
}
