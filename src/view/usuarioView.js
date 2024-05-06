const controle = require('../controllers/usuarioControle');
//const Paciente = require('../entidade/Paciente');
const Usuario = require('../entidade/Usuario');
var USUARIO_GLOBAL = null;
function obterPacienteInformado(dados){
    let cpf_num = parseInt(dados.cpf);
    //let paciente = new Paciente(cpf_num, dados.nome, dados.data_nascimento, dados.cadastro_sus, dados.endereco, dados.unidade_de_saude);
   let usuario = new Usuario(cpf_num, dados.nome, dados.data_nascimento, dados.cadastro_sus, dados.endereco, dados.unidade_de_saude, dados.usuario, dados.senha, '2')
    return usuario;
}
//inserindo dados de paciente
function inserirPaciente(dados){
    USUARIO_GLOBAL = obterPacienteInformado(dados);
    let mensagem_erro = null;
    if(USUARIO_GLOBAL != null){
        mensagem_erro = controle.inserirPaciente(USUARIO_GLOBAL);
    }else{
        mensagem_erro = "Algum atributo não foi informado";
    }
    if(mensagem_erro ===null){
        mensagem_erro = "Aconteceu um erro inesperado!";
    }
    return mensagem_erro;
}
//inserindo dados de usuario 
function inserirUsuario(){
    let mensagem_erro = null;
    if(USUARIO_GLOBAL != null){
        mensagem_erro = controle.inserirUsuario(USUARIO_GLOBAL)
    }else{
        mensagem_erro = "Algum atributo não foi informado";
    }

    if(mensagem_erro ===null){
        mensagem_erro = "Aconteceu um erro inesperado!";
    }
    return mensagem_erro;
}
//parte que não se cadastra mas já realiza o login diretamente ou se cadastra e realiza o login
function obterUsuarioInformado(dados){
    let usuario = new Usuario();
    usuario.setLogin(dados.usuario);
    return usuario;
}
async function obterUsuario(dados){
    let usuario = obterUsuarioInformado(dados);
    //let mensagem_erro = null;
    if(usuario != null){
        //seta os dados em usuario
       
        await controle.obterUsuario(usuario);
       return usuario;
    }
}


    
module.exports = {inserirPaciente, obterUsuario, inserirUsuario}

