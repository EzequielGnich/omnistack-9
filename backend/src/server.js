const express = require("express");
const mongoose = require("mongoose");
const app = express();

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

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}, 
  access link http://localhost:${port}`);
});
