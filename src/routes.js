//imports
const express = require('express');
const routes = express.Router();
//const Paciente = require('./entidade/Paciente');
const usuarioView = require('./view/usuarioView');
const sessionView = require('./view/sessaoView');
//fim imports
//variavel

//rotas usuario 
//rota para inserção de usuario
routes.post('/users', (req, res)=>{
    let inserir_paciente_mensagem = usuarioView.inserirPaciente(req.body);
    res.json(inserir_paciente_mensagem);
    let inserir_usuario_mensagem = usuarioView.inserirUsuario();
    res.json(inserir_usuario_mensagem);
});


//routes.get('/users', userControle.index);
//rota para ober informações de usuario
/*routes.put('/users', (req, res)=>{
    //retorna a consulta com o bancos de dados usuario -> paciente
    userControle.getUsuario(req.body).then(resultado=>{
        //console.log("resultado na routes:", resultado);
        res.json(resultado);
    })
});*/
routes.put('/users', async (req, res) =>{
    //com a sessão valida temos que obter o usuario(paciente) com seu dados
    //let usuario = usuarioView.obterUsuario(req.body);
    let usuario = await usuarioView.obterUsuario(req.body);
    res.json(usuario);
});
//rotas de sessão
//routes.post('/session', sessionControle.create);
routes.post('/session', async (req, res)=>{
    //verifica se a senha é valida para aquele usuario informado.
    /*sessionControle.verificaSenha(req.body).then(resultado =>{
        res.json(resultado);
    })*/
    let usuario_valido = await sessionView.verificaSenha(req.body)
    res.json(usuario_valido);
});
module.exports = routes;