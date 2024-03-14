import express, { json } from "express";
import { randomUUID } from "node:crypto";

const app = express.Router();

export default app;

const articles = [
  {
    id: "a1",
    name: "Tournevis",
    price: 2.99,
    qty: 234,
  },
  {
    id: "a2",
    name: "Pelle",
    price: 6.5,
    qty: 12,
  },
];

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/articles", (req, res) => {
  res.json(articles);
});

app.post("/articles", json(), (req, res) => {
  const newArticle = req.body;
  const article = { ...newArticle, id: randomUUID() };
  articles.push(article);
  res.status(201).end();
});
