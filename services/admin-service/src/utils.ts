import { Value } from "../lib/dbpkg/types";
import { UpdateEntityRequestBody } from "./models/requestBody/UpdateEntityRequestBody";

export const snakeToCamel = (str: string) =>
	str.replace(/([_][a-z])/g, (group) => group.replace("_", "").toUpperCase());

export const generateSetClauseAndValuesForDbUpdate = (
	updates: UpdateEntityRequestBody
): [string, Value[]] => {
	let setClause = "";
	const setValues: Value[] = [];

	Object.entries(updates)
		.filter((entry) => entry[1])
		.forEach((entry) => {
			setClause += `${snakeToCamel(entry[0])}=?,`;
			setValues.push(entry[1]!);
		});
	setClause = setClause.slice(0, -1);

	return [setClause, setValues];
};
