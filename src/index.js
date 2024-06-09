
const express = require('express');
const app = express();
const port = 3333;
const routes = require('./routes');
const Paciente = require('./entidade/Paciente');
const Usuario = require('./entidade/Usuario');
const Agendamento = require('./entidade/Agendamento');
//const bd = require('./database/config');
//cria o banco;
//bd.openDb();
//cria as tabelas
Paciente.createTable();
Usuario.createTable();
Agendamento.createAgendamento();
Agendamento.createPacienteSemCadastro();
Agendamento.createDataHora();
//adicionar json para a aplixação entender seu uso.
app.use(express.json());
//usa a const rotas
app.use(routes);
//escuta a porta informada.
app.listen(port);
