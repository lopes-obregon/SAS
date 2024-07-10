const controle = require("../controllers/usuarioControle");
//const Paciente = require('../entidade/Paciente');
const Usuario = require("../entidade/Usuario");
var USUARIO_GLOBAL = null;
function obterPacienteInformado(dados) {
  let cpf_num = parseInt(dados.cpf);
  //verificar se existe o método fornecido
  if (dados?.cadastro_sus) {
    let usuario = new Usuario(
      cpf_num,
      dados.nome,
      dados.data_nascimento,
      dados.cadastro_sus,
      dados.endereco,
      dados.unidade_saude,
      dados.usuario,
      dados.senha,
      "2"
    );
    return usuario;
  } else if (dados?.cnes) {
    //médico
    console.log("Médico:");
    let usuario = new Usuario(
      cpf_num,
      dados.nome,
      dados.data_nascimento,
      dados.cnes,
      dados.endereco,
      dados.unidade_saude,
      dados.usuario,
      dados.senha,
      "1"
    );
    console.log(usuario);
    return usuario;
  } else {
    return null;
  }
}
//inserindo dados de paciente
function inserirPaciente(dados) {
  USUARIO_GLOBAL = obterPacienteInformado(dados);
  if (USUARIO_GLOBAL != null) {
    return controle.inserirPaciente(USUARIO_GLOBAL);
  } else {
    //mensagem_erro = "Algum atributo não foi informado";
    return { error: "Algum atributo não informado!" };
  }
}
//inserindo dados de usuario
function inserirUsuario() {
  if (USUARIO_GLOBAL != null) {
    return controle.inserirUsuario(USUARIO_GLOBAL);
  } else {
    return { error: "Algum atributo não foi informado" };
  }
}
//parte que não se cadastra mas já realiza o login diretamente ou se cadastra e realiza o login
function obterUsuarioInformado(dados) {
  let usuario = new Usuario();
  usuario.setLogin(dados.usuario);
  return usuario;
}
async function obterUsuario(dados) {
  let usuario = obterUsuarioInformado(dados);
  //let mensagem_erro = null;
  if (usuario != null) {
    //seta os dados em usuario

    await controle.obterUsuario(usuario);
    return usuario;
  }
}

module.exports = { inserirPaciente, obterUsuario, inserirUsuario };
