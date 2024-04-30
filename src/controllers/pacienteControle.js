const bd = require("../database/config");
module.exports ={
    async  createTable(){
        bd.openDb().then(banco =>{
            banco.exec('CREATE TABLE IF NOT EXISTS paciente(cpf INTEGER NOT NULL PRIMARY KEY, nome TEXT, data_nascimento TEXT, cadastro_sus TEXT, endereco TEXT, unidade_de_saude TEXT)')
        })
    },
    async inserirPaciente(paciente){
        let cpf_numero = parseInt(paciente.cpf);

        bd.openDb().then(banco =>{
            let sql = `INSERT INTO paciente (cpf, nome, data_nascimento, cadastro_sus, endereco, unidade_de_saude) VALUES(${cpf_numero}, '${paciente.nome}', '${paciente.data_nascimento}', '${paciente.cadastro_sus}', '${paciente.endereco}', '${paciente.unidade_saude}')`;
            banco.exec(sql).catch(err => {console.log("Algo deu errado para cadastrar o paciente:", err);});
        });
        return cpf_numero;
    }
}