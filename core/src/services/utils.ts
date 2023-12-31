import { Value } from "@core/services/lib/dbpkg/types";
import { ServiceUpdateEntityRequestBody } from "@core/services/models/requestBody";
import { customAlphabet } from "nanoid";

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

export const generateCode = () => {
	const random = customAlphabet("123456789abcdefghijkmnoprstuvyz", 16)();
	return [
		random.slice(0, 4),
		random.slice(4, 8),
		random.slice(8, 12),
		random.slice(12, 16),
	].join("-");
};
