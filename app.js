const express = require("express");
const cors = require("cors");

const app = express();

const niveisRoutes = require("./src/routes/niveisRoutes")

app.use(cors()); //permite que requisições externas acessem as rotas.
app.use(express.json()); //transforma o JSON do corpo da requisição em JS.

app.get("/", (req,res) =>{
    res.send("Hello World");
});

app.use("/niveis", niveisRoutes);

app.listen(3000, () => {
    console.log("Servidor on: http://localhost:3000");
});