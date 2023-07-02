import { router } from "@/routes";
import { parseJwt } from "@core/common/middlewares/parseJwt";
import cors from "cors";
import express from "express";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(parseJwt);

app.use(router);
