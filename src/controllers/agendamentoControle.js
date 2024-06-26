const Agendamento = require('../entidade/Agendamento');
async function inserirAgendamento(agendamento){
    let mensagem = null;
    if(!await Agendamento.isPacienteExistente(agendamento)){
        await Agendamento.pacienteNãoExistente(agendamento).then(()=> mensagem = "Agendamento Realizado Com Sucesso!");
    }else{
        //existe paciente cadastrado
        await Agendamento.pacienteExistente(agendamento).then(() => mensagem = "Agendamento Realizado Com Sucesso!");
    }
    return mensagem;
}
async function obterDataHora(data_infomada){
    return await Agendamento.getDataHora(data_infomada);
}

module.exports = {inserirAgendamento, obterDataHora};