import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'

const prisma = new PrismaClient()

dotenv.config()
const app = express();
const PORT = 8080;

app.use(cors());

console.log("checking for env", process.env.DATABASE_URL)

app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
