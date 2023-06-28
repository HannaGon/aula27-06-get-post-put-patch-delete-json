const express = require("express")
const cors = require("cors")
const alunoRotas = require("./routes/alunoRoute")
const app = express()

app.use(express.json())
app.use(cors())

app.use("/alunos", alunoRotas)

module.exports=app