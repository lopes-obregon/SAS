//imports
const bd = require("../database/config");

class Paciente{
    constructor(cpf = 0, nome = "", data_nascimento = "", cadastro_sus = "", endereco = "", unidade_de_saude = "") {
        this.cpf = cpf;
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.cadastro_sus = cadastro_sus;
        this.endereco = endereco;
        this.unidade_de_saude = unidade_de_saude;
    }
    //método para inserir paciente usuario no banco de dados
    setCpf(novo_cpf){
        this.cpf = novo_cpf;
    }
    getCpf(){
        return this.cpf;
    }
    static async  inserirPaciente(paciente){
        //método que cadastra o paciente no banco de dados 
        let banco = await bd.openDb();

        try {
            let sql = `INSERT INTO paciente (cpf, nome, data_nascimento, cadastro_sus, endereco, unidade_de_saude) VALUES(${paciente.cpf}, '${paciente.nome}', '${paciente.data_nascimento}', '${paciente.cadastro_sus}', '${paciente.endereco}', '${paciente.unidade_saude}')`;
            console.log(sql);
            await banco.exec(sql).then(()=>{
                return { success:true, message:"Paciente inserido com sucesso"};
            }).catch(error =>{
                console.log("Error na inserção:", error);
                mensagem = "Error ao inserir o Paciente";
                return { error: 'Erro ao inserir o Paciente' };
            })
        }finally{
            banco.close();
        }

    }
    static async  pacienteMesmoAtributos(paciente){
        //método para ver paciente com mesmo atributo.
        //retornando caso o objeto passado tenha o mesmo atributos.
        let banco = await bd.openDb();
        let n_paciente_mesmo_atributo = 0;
        try{
            let sql = `SELECT COUNT(cpf) AS count from paciente WHERE  nome='${paciente.nome}' AND cadastro_sus='${paciente.cadastro_sus}'`;
            await banco.get(sql).then(resultado =>{
                n_paciente_mesmo_atributo = resultado.count;
            }).catch(error => console.log("Algo deu errado na contagem:", error));
            if(n_paciente_mesmo_atributo > 0){
                return true;
            }else{
                return false;
            }
        }finally{
            banco.close();
        }
    
    }
    //método para criar a tabela no banco de daods
    static async  createTable(){
        let banco = await bd.openDb();
        let sql = 'CREATE TABLE IF NOT EXISTS paciente(cpf INTEGER NOT NULL PRIMARY KEY, nome TEXT, data_nascimento TEXT, cadastro_sus TEXT, endereco TEXT, unidade_de_saude TEXT)';
        try{
            await banco.exec(sql).catch(err =>{
                console.log("Error ao criar a tabela Paciente!");
            });
        }finally{
            await banco.close();
        }
    }
}
module.exports= Paciente;