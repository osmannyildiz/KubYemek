import { Admin } from "@core/common/models/entity/frontend";

export enum UserType {
	admin = "admin",
}

export interface IAdminTokenPayload {
	userType: UserType.admin;
	adminId: number;
	adminUsername: string;
	adminEmail: string;
}

export abstract class UserTokenPayload {
	constructor(protected userType: UserType) {}
}

export class AdminTokenPayload extends UserTokenPayload {
	protected adminId: number;
	protected adminUsername: string;
	protected adminEmail: string;

	constructor(admin: Admin) {
		super(UserType.admin);
		this.adminId = admin.id;
		this.adminUsername = admin.username;
		this.adminEmail = admin.email;
	}

	toPlainObject(): IAdminTokenPayload {
		return {
			userType: this.userType,
			adminId: this.adminId,
			adminUsername: this.adminUsername,
			adminEmail: this.adminEmail,
		};
	}
}
