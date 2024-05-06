const Paciente = require('../entidade/Paciente');
const Usuario = require('../entidade/Usuario');
function inserirPaciente(paciente){
    
    
    if(!Paciente.pacienteMesmoAtributos(paciente)){
        //retorna uma mensagem;
        return Paciente.inserirPaciente(paciente);
    }else{
        return "Paciente Já cadastrado!";
    }
}
async function inserirUsuario(usuario){
    if(!await Usuario.usuarioMesmoAtributos(usuario)){
        return await Usuario.inserirUsuario(usuario);
    }
}
async function obterUsuario(usuario){
    
    await Usuario.getUsuario(usuario)
   
}
module.exports = {inserirPaciente, obterUsuario, inserirUsuario};