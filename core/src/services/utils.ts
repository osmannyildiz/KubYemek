import { Value } from "@core/services/lib/dbpkg/types";
import { ServiceUpdateEntityRequestBody } from "@core/services/models/requestBody";

export const snakeToCamel = (str: string) =>
	str.replace(/([_][a-z])/g, (group) => group.replace("_", "").toUpperCase());

export const camelToSnake = (str: string) =>
	str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const generateSetClauseAndValuesForDbUpdate = (
	updates: ServiceUpdateEntityRequestBody
): [string, Value[]] => {
	let setClause = "";
	const setValues: Value[] = [];

	Object.entries(updates)
		.filter((entry) => entry[1])
		.forEach((entry) => {
			setClause += `${camelToSnake(entry[0])} = ?, `;
			setValues.push(entry[1]!);
		});
	setClause = setClause.slice(0, -2);

	return [setClause, setValues];
};

export const dateForDb = (dateObj: Date) =>
	`${dateObj.toISOString().slice(0, 10)} ${dateObj
		.toISOString()
		.slice(11, 19)}`;

export const datetimeForDb = (dateObj: Date) =>
	`${dateObj.toISOString().slice(0, 10)} ${dateObj
		.toISOString()
		.slice(11, 19)}`;
