import { DbTableRepositoryBase } from "../../lib/dbpkg/repository";
import type { DbconnGetter } from "../../lib/dbpkg/types";
import type { DbAdmin } from "../models/db/DbAdmin";

export class DbAdminsRepository extends DbTableRepositoryBase<DbAdmin> {
	constructor(getDbconn: DbconnGetter) {
		super("admins", getDbconn);
	}

	async insert(email: string, password: string): Promise<number> {
		return await this._insert("email,password", "?,?", [email, password]);
	}
}
