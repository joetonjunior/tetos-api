const express = require("express");
const cors = require("cors");
const niveisRoutes = require("./src/routes/niveisRoutes");
const imoveisTipoRoutes = require("./src/routes/imoveisTipoRoutes");
const usuariosRoutes = require("./src/routes/usuariosRoutes");
const locatariosRoutes = require("./src/routes/locatariosRoutes");
const imoveisRoutes = require("./src/routes/imoveisRoutes");
const { login } = require("./src/controllers/usuariosController");
const { usuarioAutenticado } = require("./src/middelwares/usuarioMiddlewares");


const app = express();



app.use(cors()); //permite que requisições externas acessem as rotas.
app.use(express.json()); //transforma o JSON do corpo da requisição em JS.

app.get("/", (req,res) =>{
    res.send("Hello World");
});

app.post("/login", login);

app.use("/niveis", usuarioAutenticado, niveisRoutes);

app.use("/imoveis-tipo", usuarioAutenticado, imoveisTipoRoutes);

app.use("/usuarios", usuarioAutenticado, usuariosRoutes);

app.use("/locatarios", usuarioAutenticado, locatariosRoutes);

app.use("/imoveis", usuarioAutenticado, imoveisRoutes);

app.listen(3000, () => {
    console.log("Servidor on: http://localhost:3000");
});