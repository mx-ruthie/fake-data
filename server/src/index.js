import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const app = express();
const PORT = 8080;

app.use(cors());

app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
