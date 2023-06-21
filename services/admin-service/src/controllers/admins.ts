import type { RequestHandler } from "express";
import { db } from "../db";
import { DbAdmin } from "../models/db/DbAdmin";
import { AddAdminRequestBody } from "../models/requestBody/admins/AddAdminRequestBody";
import { UpdateAdminRequestBody } from "../models/requestBody/admins/UpdateAdminRequestBody";
import { generateSetClauseAndValuesForDbUpdate } from "../utils";

export const getAdmins: RequestHandler<
	undefined,
	DbAdmin[],
	undefined
> = async (req, res) => {
	const adminRepo = db.admins();

	const admins = await adminRepo.getAll();
	return res.json(admins);
};

export const addAdmin: RequestHandler<
	undefined,
	undefined,
	AddAdminRequestBody
> = async (req, res) => {
	const { email, password } = req.body;
	const adminRepo = db.admins();

	if (!email || !password) {
		return res.sendStatus(400);
	}

	await adminRepo.insert(email, password);
	return res.sendStatus(201);
};

export const getAdmin: RequestHandler<
	{ adminId: string },
	DbAdmin,
	undefined
> = async (req, res) => {
	const { adminId } = req.params;
	const adminRepo = db.admins();

	const admin = await adminRepo.getById(+adminId);
	if (!admin) {
		return res.sendStatus(404);
	}

	return res.json(admin);
};

export const updateAdmin: RequestHandler<
	{ adminId: string },
	undefined,
	UpdateAdminRequestBody
> = async (req, res) => {
	const { adminId } = req.params;
	const adminRepo = db.admins();

	await adminRepo.update(
		...generateSetClauseAndValuesForDbUpdate(req.body),
		"id=?",
		[adminId]
	);
	return res.sendStatus(200);
};

export const deleteAdmin: RequestHandler<
	{ adminId: string },
	undefined,
	undefined
> = async (req, res) => {
	const { adminId } = req.params;
	const adminRepo = db.admins();

	await adminRepo.deleteById(+adminId);
	return res.sendStatus(200);
};
