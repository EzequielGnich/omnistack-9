const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3333;

// req.query = acessar query params (para filtros)
// req.params = acessar route params (para edição e delete)
// req.body = acessar corpo da requisição (para criação e edição)

app.get("/", (req, res) => {
  res.json({ name: "Ola mundo" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}, 
  access link http://localhost:${port}`);
});
