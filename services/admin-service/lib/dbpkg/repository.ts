import { ResultSetHeader } from "mysql2";
import type { DbconnGetter, Value } from "./types";

export class DbTableRepositoryBase<TRow> {
	constructor(readonly tableName: string, readonly getDbconn: DbconnGetter) {}

	async getOne(
		whereClause: string,
		whereValues: Value[]
	): Promise<TRow | null> {
		const dbconn = await this.getDbconn();

		let sql: string;
		let sqlValues: Value[] | undefined;
		if (whereClause) {
			sql = `SELECT * FROM ${this.tableName} WHERE ${whereClause};`;
			sqlValues = whereValues;
		} else {
			sql = `SELECT * FROM ${this.tableName};`;
		}

		const queryResp = await dbconn.execute(sql, sqlValues);
		return (queryResp[0] as TRow[])[0] || null;
	}

	async getAll(whereClause?: string, whereValues?: Value[]): Promise<TRow[]> {
		const dbconn = await this.getDbconn();

		let sql: string;
		let sqlValues: Value[] | undefined;
		if (whereClause) {
			sql = `SELECT * FROM ${this.tableName} WHERE ${whereClause};`;
			sqlValues = whereValues;
		} else {
			sql = `SELECT * FROM ${this.tableName};`;
		}

		const queryResp = await dbconn.execute(sql, sqlValues);
		return queryResp[0] as TRow[];
	}

	async getById(id: number): Promise<TRow | null> {
		return await this.getOne("id=?", [id]);
	}

	async update(
		setClause: string,
		setValues: Value[],
		whereClause: string,
		whereValues: Value[]
	): Promise<void> {
		const dbconn = await this.getDbconn();

		const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE ${whereClause};`;
		const sqlValues = [...setValues, ...whereValues];

		await dbconn.execute(sql, sqlValues);
	}

	async updateColumnWithValue(
		column: string,
		newValue: Value,
		whereClause: string,
		whereValues: Value[]
	): Promise<void> {
		await this.update(`${column}=?`, [newValue], whereClause, whereValues);
	}

	async increaseColumn(
		column: string,
		amount: number,
		whereClause: string,
		whereValues: Value[]
	): Promise<void> {
		await this.update(
			`${column}=${column}+?`,
			[amount],
			whereClause,
			whereValues
		);
	}

	async decreaseColumn(
		column: string,
		amount: number,
		whereClause: string,
		whereValues: Value[]
	): Promise<void> {
		await this.update(
			`${column}=${column}-?`,
			[amount],
			whereClause,
			whereValues
		);
	}

	async delete(whereClause: string, whereValues: Value[]): Promise<void> {
		const dbconn = await this.getDbconn();

		const sql = `DELETE FROM ${this.tableName} WHERE ${whereClause};`;
		const sqlValues = [...whereValues];

		await dbconn.execute(sql, sqlValues);
	}

	async deleteById(id: number): Promise<void> {
		return await this.delete(`id=?`, [id]);
	}

	async _insert(
		columns: string,
		valuesClause: string,
		valuesValues: Value[]
	): Promise<number> {
		const dbconn = await this.getDbconn();

		const sql = `INSERT INTO ${this.tableName}(${columns}) VALUES (${valuesClause})`;
		const sqlValues = [...valuesValues];

		const queryResp = await dbconn.execute(sql, sqlValues);
		return (queryResp[0] as ResultSetHeader).insertId;
	}
}
