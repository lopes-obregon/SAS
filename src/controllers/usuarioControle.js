const Paciente = require("../entidade/Paciente");
const Usuario = require("../entidade/Usuario");
async function inserirPaciente(paciente) {
  if (!(await Paciente.pacienteMesmoAtributos(paciente))) {
    //retorna uma mensagem;
    console.log("usuário no controle:", paciente);
    return await Paciente.inserirPaciente(paciente);
  } else {
    return { error: "Paciente  ou Profissional Já cadastrado!" };
  }
}
async function inserirUsuario(usuario) {
  if (!(await Usuario.usuarioMesmoAtributos(usuario))) {
    return await Usuario.inserirUsuario(usuario);
  } else {
    return { error: "Usuário já cadastrado!" };
  }
}
async function obterUsuario(usuario) {
  await Usuario.getUsuario(usuario);
}
module.exports = { inserirPaciente, obterUsuario, inserirUsuario };
