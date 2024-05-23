//importar agendamento
const Agendamento = require('../entidade/Agendamento');
const controle = require('../controllers/agendamentoControle');
//ela retorna o objeto agendamento e formata os dados para criar o mesmo
function obterAgendamentoInformado(dados){
    /**
     * formatando os dados para criar o objeto Agendamento 
     * que tem como parametro objeto Data
     */
    let agendamento = null;
    console.log("dados recebidos:",dados);
    //verificar se os dados não estão vazios
    if(Object.keys(dados).length != 0){
        let data_formatada = dados.data  + " " + dados.hora;
        console.log(data_formatada);
        agendamento = new Agendamento(new Date(), dados.nome, dados.cartão_sus);

    }else{
        agendamento = null;
    }
    return agendamento;
}
function inserirAgendamento(dados){
    let mensagem = null;
    let agendamento = obterAgendamentoInformado(dados);
    if(agendamento != null){
        mensagem = controle.inserirAgendamento(agendamento);
    }else{
        mensagem = "Algo deu errado!";
    }
    return mensagem;
}

module.exports = {inserirAgendamento}