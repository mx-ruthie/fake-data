import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const prisma = new PrismaClient();

dotenv.config();
const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.json()); //json wasn't parsing. I did some chatgpt queries about it and stumbled across the answer that I actually needed to resolve a similar issue in my final project. Great to see it again and solve it more quickly with less frustration.

app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
    console.log(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve products" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to retrieve product" });
  }
});


app.post("/api/products/:id", async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    console.log("i'm the body", req.body);
    if (!name || !description || !imageUrl) {
      return res
        .status(400)
        .json({ success: false, error: "Missing product field" });
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

app.put("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, imageUrl } = req.body;

    console.log("i'm the body", req.body);
    if (!name || !description || !imageUrl) {
      return res
        .status(400)
        .json({ success: false, error: "Missing product field" });
    }

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        description,
        imageUrl,
      },
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to update product" });
  }
});

app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`));
