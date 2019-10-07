const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const port = process.env.PORT || 3333;
const routes = require("./routes");

mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-ux1ju.mongodb.net/omnistack9?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Não é a forma mais perfomatica de adicionar os usuarios logados no socket,
// utilizar Redis
const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

// req.query = acessar query params (para filtros)
// req.params = acessar route params (para edição e delete)
// req.body = acessar corpo da requisição (para criação e edição)

app.use(cors());
app.use(express.json());
// Usado para enviar a imgaem para o frontend
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}, 
  access link http://localhost:${port}`);
});
