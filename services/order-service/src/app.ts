import { router } from "@/routes";
import { parseJwt } from "@core/common/middlewares/parseJwt";
import express from "express";

export const app = express();

app.use(express.json());
app.use(parseJwt);

app.use(router);
