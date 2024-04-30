const express = require('express');
const routes = express.Router();
const userControle = require('./controllers/usersControle');
const sessionControle = require('./controllers/sessionControle');
const pacienteControle = require('./controllers/pacienteControle');
//rotas usuario 
routes.post('/users',(req,res)=>{
    /*userControle.insertUsr(req.body).then(()=>{
        pacienteControle.inserirPaciente(req.body);
    }).catch(err =>{
        console.log("Algum error na insersção:", err);
    })*/
    pacienteControle.inserirPaciente(req.body).then(cpf=>{
        userControle.insertUsr(req.body, cpf).then(resultado=>{
            res.json(resultado);
        })
    }).catch(err =>{
        let resposta = "Usuario existente ou dados invalidos!"
        console.log("Algo deu errado ao inserir:", err);
        res.json(resposta);
    })
    //console.log(req.body);
});
//routes.get('/users', userControle.index);
routes.put('/users', (req, res)=>{
    userControle.index(req.body).then(resultado=>{
        //console.log("resultado na routes:", resultado);
        res.json(resultado);
    })
});
//rotas de sessão
//routes.post('/session', sessionControle.create);
routes.post('/session', (req, res)=>{
    sessionControle.create(req.body).then(resultado =>{
        res.json(resultado);
    })
});
module.exports = routes;