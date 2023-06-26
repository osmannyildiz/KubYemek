import { snakeToCamel } from "@core/common/utils";
import { Value } from "@core/services/lib/dbpkg/types";
import { ServiceUpdateEntityRequestBody } from "@core/services/models/requestBody";

export const generateSetClauseAndValuesForDbUpdate = (
	updates: ServiceUpdateEntityRequestBody
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
