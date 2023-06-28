const express = require("express")
const rotas = express.Router()
const alunoControllers = require("../controllers/alunoController")

rotas.get("/lista", alunoControllers.exibeTodas)
rotas.get("/id/:id", alunoControllers.buscaId)
rotas.get("/busca/:busca", alunoControllers.buscaNome)

rotas.post("/novo", alunoControllers.criarUser)
rotas.put("/put/:id", alunoControllers.atualizarPut)
rotas.patch("/patch/:id", alunoControllers.atualizarPatch)
rotas.delete("/delete/:id", alunoControllers.deletarUser)

module.exports=rotas