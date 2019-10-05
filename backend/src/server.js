const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-ux1ju.mongodb.net/omnistack9?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const routes = require("./routes");

const port = process.env.PORT || 3333;

// req.query = acessar query params (para filtros)
// req.params = acessar route params (para edição e delete)
// req.body = acessar corpo da requisição (para criação e edição)

app.use(cors());
app.use(express.json());
// Usado para enviar a imgaem para o frontend
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}, 
  access link http://localhost:${port}`);
});
