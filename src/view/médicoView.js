const Médico = require("../entidade/Usuario"); //vai ser dessa forma por causa que são praticamente os mesmos dados.
const MÉDICO = undefined;
function obterMédicoInformado(dados) {
  let cpf = parseInt(dados?.cpf);
  //cria o objeto do Médico.
  let médico = new Médico(
    cpf,
    dados?.nome,
    dados?.data_nascimento,
    dados?.cnes,
    dados?.endereco,
    dados?.unidade_de_saude,
    dados?.usuario,
    dados?.senha,
    "1"
  );
  return médico;
}
function inserirMédico(dados) {
  MÉDICO = obterMédicoInformado(dados);
  if (MÉDICO != null) {
    return;
  }
}
module.exports = { inserirMédico };
