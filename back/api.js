const express = require("express");

const app = express.Router();

module.exports = app;

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

app.get("/articles", (req, res) => {
  res.json(articles);
});
