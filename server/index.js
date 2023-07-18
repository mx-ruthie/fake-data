import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'

const prisma = new PrismaClient()

dotenv.config()
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.get("/api/products", async (req, res) => {
    console.log("hi123");
    const products = await prisma.product.findMany()
    res.json(products)
    console.log(products);
   
})

app.post("/api/products", async (req, res) => {
    try {
      const { name, description, imageUrl } = req.body;
  
      console.log("i'm the body", req.body);
      if (!name || !description || !imageUrl) {
        return res.status(400).json({ success: false, error: "Missing product field" });
      }
  
      const product = await prisma.product.create({
        data: {
          name,
          description,
          imageUrl,
        },
      });
  
      res.status(201).json({ success: true, product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to create product" });
    }
  });
  



app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
