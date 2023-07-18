import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'

const prisma = new PrismaClient()

dotenv.config()
const app = express();
const PORT = 8080;

app.use(cors());

app.get("/api/products", async (req, res) => {
    console.log("hi123");
    const products = await prisma.product.findMany()
    res.json(products)
    console.log(products);
   
})



app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
