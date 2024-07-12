//importar agendamento
const Agendamento = require("../entidade/Agendamento");
const controle = require("../controllers/agendamentoControle");
//ela retorna o objeto agendamento e formata os dados para criar o mesmo
function obterAgendamentoInformado(dados) {
  /**
   * formatando os dados para criar o objeto Agendamento
   * que tem como parametro objeto Data
   */
  let agendamento = null;
  console.log("dados recebidos:", dados);
  //verificar se os dados não estão vazios
  if (Object.keys(dados).length != 0) {
    //let data_formatada = dados.data  + " " + dados.hora;
    //console.log(data_formatada);
    let data_array = dados?.data.split("-");
    let ano_int = parseInt(data_array[0]);
    let mes_int = parseInt(data_array[1]);
    let dia_int = parseInt(data_array[2]);
    let horas_array = dados?.hora.split(":");
    let hora = horas_array[0];
    let minutos = horas_array[1];
    let hora_int = parseInt(hora);
    let minutos_int = parseInt(minutos);
    if (dados?.filhos != undefined || dados?.filhos != null) {
      agendamento = new Agendamento(
        new Date(ano_int, mes_int, dia_int, hora_int, minutos_int),
        0,
        dados.nome,
        "",
        dados?.cartão_sus,
        "",
        "",
        "",
        dados?.filhos,
        "2",
        ""
      );
    } else {
      if (dados?.user?.permissao == "1") {
        let cnes_int = dados?.user?.cpf.toString();
        agendamento = new Agendamento(
          new Date(ano_int, mes_int, dia_int, hora_int, minutos_int),
          dados?.cpf,
          dados?.nome,
          dados?.data_nascimento,
          dados?.card_sus,
          dados?.endereço,
          dados?.user?.unidade_de_saude,
          dados?.idade,
          [],
          dados?.user?.permissao,
          cnes_int
        );
      } else {
        //se for paciente
        /*agendamento = new Agendamento(
          new Date(ano_int, mes_int, dia_int, hora_int, minutos_int),
          dados.nome,
          dados.cartão_sus,
          [],
        );*/
        agendamento = new Agendamento(
          new Date(ano_int, mes_int, dia_int, hora_int, minutos_int),
          0,
          dados?.nome,
          "",
          dados?.cartão_sus,
          "",
          "",
          "",
          [],
          "2",
          ""
        );
      }
    }
  } else {
    agendamento = null;
  }
  return agendamento;
}
function inserirAgendamento(dados) {
  let mensagem = null;
  let agendamento = obterAgendamentoInformado(dados);
  if (agendamento != null) {
    mensagem = controle.inserirAgendamento(agendamento);
  } else {
    mensagem = "Algo deu errado!";
  }
  return mensagem;
}

async function obterDataHora(dados) {
  console.log(dados?.data);
  if (dados?.data != null && dados?.data != "") {
    var data_array = dados?.data.split("-");
    let data_informado = new Date(
      parseInt(data_array[0]),
      parseInt(data_array[1]),
      parseInt(data_array[2])
    );
    if (data_informado != null) {
      return await controle.obterDataHora(data_informado);
    }
  }
}
async function obterMeusAgendamentos(dados) {
  let cadastro_sus = dados?.cadastro_sus;
  console.log("Cadastro sus na view", cadastro_sus);
  console.log(cadastro_sus != null && cadastro_sus != "");
  if (cadastro_sus != null && cadastro_sus != "") {
    console.log("chamando o método");

    return await controle.obterMeusAgendamentos(cadastro_sus);
  }
}
module.exports = { inserirAgendamento, obterDataHora, obterMeusAgendamentos };
