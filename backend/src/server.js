const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ name: "Ola mundo" });
});

app.listen(3333);
