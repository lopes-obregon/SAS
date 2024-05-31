//imports
const express = require('express');
const routes = express.Router();
//const Paciente = require('./entidade/Paciente');
const usuarioView = require('./view/usuarioView');
const sessionView = require('./view/sessaoView');
const agendamentoView = require('./view/agendamentoView');
//fim imports
//variavel

//rotas usuario 
//rota para inserção de usuario
routes.post('/users', async (req, res) => {
    try {
        let inserir_paciente_mensagem = await usuarioView.inserirPaciente(req.body);
        
        if (inserir_paciente_mensagem?.error) {
            return res.status(400).json({ message: inserir_paciente_mensagem.error });
        }

        let inserir_usuario_mensagem = await usuarioView.inserirUsuario(req.body);
        
        if (inserir_usuario_mensagem?.error) {
            return res.status(400).json({ message: inserir_usuario_mensagem.error });
        }

        res.status(201).json({ message: 'Paciente e usuário inseridos com sucesso' });
    } catch (error) {
        console.error("Erro ao inserir paciente e usuário:", error);
        res.status(500).json({ message: 'Erro ao inserir paciente e usuário' });
    }
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
routes.post('/agendamento', async(req, res)=>{
    let agendamento_mensagem = await agendamentoView.inserirAgendamento(req.body)
    res.json(agendamento_mensagem);
})
module.exports = routes;