import { Admin_Private } from "@core/common/models/entity/backend";
import { DbTableRepositoryBase } from "@core/services/lib/dbpkg/repository";
import type { DbconnGetter } from "@core/services/lib/dbpkg/types";

export class DbAdminsRepository extends DbTableRepositoryBase<Admin_Private> {
	constructor(getDbconn: DbconnGetter) {
		super("admins", getDbconn);
	}

	async insert(
		username: string,
		email: string,
		hashedPassword: string
	): Promise<number> {
		return await this._insert("username,email,hashed_password", "?,?,?", [
			username,
			email,
			hashedPassword,
		]);
	}
}
