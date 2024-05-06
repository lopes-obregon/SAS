
const  Sessao  = require('../entidade/sessao');
//aguarda a sessão verificar a senha ou login
async function verificarSenha(login){
   return await Sessao.verificaLogin(login)
}

module.exports = {verificarSenha}