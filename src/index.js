
const express = require('express');
const app = express();
const port = 3333;
const routes = require('./routes');
const pacienteControle = require('./controllers/pacienteControle');
const usr = require('./controllers/usersControle');
//const bd = require('./database/config');
//cria o banco;
//bd.openDb();
//cria as tabelas
pacienteControle.createTable();
usr.createTable();
//adicionar json para a aplixação entender seu uso.
app.use(express.json());
app.use(routes);
app.listen(port);
