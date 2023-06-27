import { router } from "@/routes";
import cors from "cors";
import express from "express";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
