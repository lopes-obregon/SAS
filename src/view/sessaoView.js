const sessionControle = require('../controllers/sessionControle');
const Sessao = require('../entidade/sessao');
//cria e retorna o objeto sessão 
function obterSessaoInfomada(dados){
    let sessao = new Sessao(dados.usuario, dados.senha);
    return sessao;
}
//chama o controle para verificar se é usuario valido ou não se a senha é valida
async function verificaSenha(dados){
    let sessao = obterSessaoInfomada(dados);
    let usuario_valido = false;
    if(sessao != null){
        usuario_valido = await sessionControle.verificarSenha(sessao)
    }
    return usuario_valido;
 }
 //construir objeto apartir do login
 module.exports = {verificaSenha};