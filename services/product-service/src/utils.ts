export const incrementSlug = (slug: string) => {
	const splitted = slug.split("-");
	const suffix = splitted.pop();
	if (!suffix) return slug + "-2";

	const isNumber = /^\d+$/.test(suffix);
	if (!isNumber) return slug + "-2";

	splitted.push(`${+suffix + 1}`);
	return splitted.join("-");
};
