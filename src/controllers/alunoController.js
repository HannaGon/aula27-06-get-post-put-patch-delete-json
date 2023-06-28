const db = require("../models/alunoModel")
const crypto = require("crypto")

const exibeTodas = async(req,res)=>{
try {
    const alunos = await db()
    res.status(200).send(alunos)
} catch (error) {
    res.status(500).send({
        message: error.message
    })
}}

const buscaId = async(req,res)=>{
const alunos = await db()
const { id } = req.params
    try {
        const alunoEncontrado = alunos.find(aluno => aluno.id ==id)
        if (alunoEncontrado==undefined){
            return res.status(404).send({
                message: `Não existe Aluno para este ID`
            })}
        res.status(200).send(alunoEncontrado)
        }
     catch (error) {
    res.status(500).send({
        message: error.message
    })
}}
const buscaNome = async(req,res)=>{
const alunos=await db()
const { busca } = req.params
let alunosEncontrados = []
try {
    for(let aluno of alunos){
        if(aluno.nome.toLowerCase().includes(busca.toLowerCase())){
            alunosEncontrados.push(aluno)
        }
    }
    if (alunosEncontrados[0]==undefined){
        res.status(404).send({
            message: `Aluno não encontrado`
        })
    }
    res.status(200).send(alunosEncontrados)
} catch (error) {
    res.status(500).send({
        message: error.message
    })
}}

const criarUser = async(req,res)=>{
const alunos = await db()
//puxa dados do banco
const { user, nome } = req.body[0]
//puxa dados do body para variavel
try {
    const novoUsuario = {id: crypto.randomUUID(),user:user,nome:nome}
    alunos.push(novoUsuario)
    res.status(201).send(novoUsuario)
} catch (error) {
    res.status(500).send({
        message: error.message
    })
}}

const atualizarPut = async(req,res)=>{
const alunos = await db()
const { id } = req.params
const { ...alunoBody } = req.body[0]
try {
    const alunoEncontrado = alunos.find(aluno=>aluno.id==id)
    if (alunoEncontrado==undefined){
        return res.status(404).send({
            message: `ID não encontrado`
        })
    }
    const chaves = Object.keys(alunoEncontrado)
    chaves.forEach(chave=>{
        let dadoAtualizado=alunoBody[chave]
        let existeDado = new Boolean(dadoAtualizado)
        if (existeDado==true) alunoEncontrado[chave]= dadoAtualizado
    })
    res.status(200).send(alunoEncontrado)
} catch (error) {
    res.status(500).send({
        message: error.message
    })
}
}

const atualizarPatch = async(req,res)=>{
const alunos = await db()
const { id } = req.params
const { user, nome } = req.body[0]
try {
    const alunoEncontrado = alunos.find(aluno=>aluno.id==id)
    if (alunoEncontrado==undefined){
        return res.status(404).send({
            message: `ID não encontrado`
        })
    }
    if (user) alunoEncontrado.user=user
    if (nome) alunoEncontrado.nome=nome
    res.status(200).send({
        message: `Alterado com sucesso`
    })
} catch (error) {
    res.status(500).send({
        message: error.message
    })
}
}

const deletarUser = async(req,res)=>{
const alunos = await db()
const { id } = req.params
try {
    const alunoIndex = alunos.findIndex(aluno => aluno.id==id)
    if (alunoIndex==-1){
        res.status(404).send({
            message: `Aluno não encontrado`
        })
    }
    alunos.splice(alunoIndex,1)
    res.status(200).send({
        message: `Aluno deletado`
    })
} catch (error) {
    res.status(500).send({
        message: error.message
    })
}
}

module.exports={
    exibeTodas,
    buscaId,
    buscaNome,
    criarUser,
    atualizarPut,
    atualizarPatch,
    deletarUser
}