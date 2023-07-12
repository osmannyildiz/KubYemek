import { NotificationKind } from "../enums";
import { Entity } from "./base";

export interface CustomerNotification extends Entity {
	id: number;
	customerId: number;
	createdAt: string;
	kind: NotificationKind;
	title: string;
	description: string;
}
