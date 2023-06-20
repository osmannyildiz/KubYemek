import type { RequestHandler } from "express";

export const getIndex: RequestHandler = async (req, res) => {
	return res.json({
		message: "It works!",
	});
};
