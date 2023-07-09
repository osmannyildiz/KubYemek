import { Customer_Private } from "@core/common/models/entity/backend";
import { DbTableRepositoryBase } from "@core/services/lib/dbpkg/repository";
import type { DbconnGetter } from "@core/services/lib/dbpkg/types";

export class DbCustomersRepository extends DbTableRepositoryBase<Customer_Private> {
	constructor(getDbconn: DbconnGetter) {
		super("customers", getDbconn);
	}

	async insert(
		email: string,
		hashedPassword: string,
		name: string,
		surname: string,
		deliveryAddress: string,
		birthDate: string
	): Promise<number> {
		return await this._insert(
			"email,hashed_password,name,surname,delivery_address,birth_date",
			"?,?,?,?,?,?",
			[email, hashedPassword, name, surname, deliveryAddress, birthDate]
		);
	}
}
