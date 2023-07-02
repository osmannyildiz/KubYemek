import { Admin } from "@core/common/models/entity/frontend";

export enum UserType {
	admin = "admin",
	customer = "customer",
}

export interface IAdminTokenPayload {
	userType: UserType.admin;
	adminId: number;
	adminUsername: string;
	adminEmail: string;
}

export abstract class UserTokenPayload {
	constructor(public userType: UserType) {}
}

export class AdminTokenPayload extends UserTokenPayload {
	public adminId: number;
	public adminUsername: string;
	public adminEmail: string;

	constructor(admin: Admin) {
		super(UserType.admin);
		this.adminId = admin.id;
		this.adminUsername = admin.username;
		this.adminEmail = admin.email;
	}

	toPlainObject(): IAdminTokenPayload {
		return {
			userType: this.userType as UserType.admin,
			adminId: this.adminId,
			adminUsername: this.adminUsername,
			adminEmail: this.adminEmail,
		};
	}
}
