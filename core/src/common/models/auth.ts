import { Admin, Customer } from "@core/common/models/entity/frontend";

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

export interface ICustomerTokenPayload {
	userType: UserType.customer;
	customerId: number;
	customerEmail: string;
	customerName: string;
	customerSurname: string;
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

export class CustomerTokenPayload extends UserTokenPayload {
	public customerId: number;
	public customerEmail: string;
	public customerName: string;
	public customerSurname: string;

	constructor(customer: Customer) {
		super(UserType.customer);
		this.customerId = customer.id;
		this.customerEmail = customer.email;
		this.customerName = customer.name;
		this.customerSurname = customer.surname;
	}

	toPlainObject(): ICustomerTokenPayload {
		return {
			userType: this.userType as UserType.customer,
			customerId: this.customerId,
			customerEmail: this.customerEmail,
			customerName: this.customerName,
			customerSurname: this.customerSurname,
		};
	}
}
