//imports
const bd = require('../database/config');

class Agendamento{
    constructor(data_hora = Date, nome_paciente="", cartão_sus="", filhos=[]){
        if (data_hora instanceof Date){
            //inteiro com dia do mes de 1 até 31
            this.dia_do_mes = data_hora.getDate();
            //inteiro com mes do ano de 0 a 11
            this.mes = data_hora.getMonth();
            //inteiro de 0 a 23 com horas
            this.hora = data_hora.getHours();
            //inteiro de 0 á 59 que representa os minutos
            this.minuto = data_hora.getMinutes();
            //id do agendamento
            this.id = 0;
            //nome do paciente
            this.nome_paciente = nome_paciente;
            this.cartão_sus = cartão_sus;
            this.filhos = filhos;

        }
    }
    static async createAgendamento(){
        let banco = await bd.openDb();
        let sql = 'CREATE TABLE IF NOT EXISTS agendamento(id INTEGER  PRIMARY KEY AUTOINCREMENT, dia INTEGER, mes INTEGER, hora INTEGER, minuto INTEGER, cadastro_sus TEXT NOT NULL, FOREIGN KEY(cadastro_sus) REFERENCES paciente(cadastro_sus) ON DELETE NO ACTION ON UPDATE NO ACTION )';
        try{
           await banco.exec(sql).catch(err=>{
                console.log("Error ao criar a tabela:", err);
           });
        }finally{
            await banco.close();
        }
    }
    static async createPacienteSemCadastro(){
        let banco = await bd.openDb();
        let sql = 'CREATE TABLE IF NOT EXISTS pacienteS(id INTEGER  PRIMARY KEY AUTOINCREMENT, nome TEXT, cartao_sus TEXT, cadastro_sus TEXT NOT NULL, FOREIGN KEY(cadastro_sus) REFERENCES paciente(cadastro_sus) ON DELETE NO ACTION ON UPDATE NO ACTION)';
        try{
            await banco.exec(sql).catch(err=>{
                 console.log("Error ao criar a tabela:", err);
            });
         }finally{
             await banco.close();
         }
    }
    static async isPacienteExistente(agendamento){
        let num_paciente_existente = 0;
        if(agendamento instanceof Agendamento){
            let banco = await bd.openDb();
            let sql = `SELECT COUNT(cpf)  AS count from paciente WHERE cadastro_sus ='${agendamento.cartão_sus}'`;
            try{
                /*await banco.exec(sql).then(result =>{
                    console.log("resultado da busca:", result);
                    num_paciente_existente = result;
                });*/
                await banco.get(sql).then(result=> num_paciente_existente = result.count);
                console.log("num Paciente depois da consulta:", num_paciente_existente);
                if(num_paciente_existente > 0){
                    return true;
                }else{
                    return false;
                }
            }finally{
                await banco.close();
            }
        }
    }
    static async pacienteExistente(agendamento){
        if(agendamento instanceof Agendamento){

            let banco = await bd.openDb();
            let sql = `INSERT INTO agendamento(dia, mes, hora, minuto, cadastro_sus) VALUES (${agendamento.dia_do_mes}, ${agendamento.mes}, ${agendamento.hora}, ${agendamento.minuto}, '${agendamento.cartão_sus}')`;
            try{
                await banco.exec(sql).catch(err =>{
                    console.log("Error na inserção:", error);
                    return "Error ao inserir o Agendametno";
                    
                })
               }finally{
                    await banco.close();
               }
        }
    }
    static async pacienteNãoExistente(agendamento){
        let sql = "";
        if(agendamento instanceof Agendamento){
            //cadastrar o paciente que não tem usuario
            let banco = await bd.openDb();
           // let sql = `INSERT INTO pacienteS(nome, cartao_sus) VALUES('${agendamento.nome_paciente}', '${agendamento.cartão_sus}')`;
            //algum filho existente
            if(agendamento.filhos.length > 0){
                for (const filho of agendamento.filhos) {
                    sql = `INSERT INTO pacienteS(nome, cartao_sus, cadastro_sus) VALUES('${filho?.nome_paciente}', '${filho?.cartão_sus}', '${agendamento.cartão_sus}')`;
                    await banco.exec(sql).catch(err =>{
                            console.log("Error na inserção:", err);
                            return "Error ao inserir o Paciente sem Login";
                        })
                    
                }
                
            }
            
            //agora cadastrar o agendamento

            try{
                for(const filho of agendamento?.filhos){
                    sql = `INSERT INTO agendamento(dia, mes, hora, minuto, cadastro_sus) VALUES (${agendamento.dia_do_mes}, ${agendamento.mes}, ${agendamento.hora}, ${agendamento.minuto}, '${filho?.cartão_sus}')`;
                    
                    await banco.exec(sql).catch(err =>{
                        console.log("Error na inserção:", err);
                        return "Error ao inserir o Agendamento";
                    })
                }
            }finally{
                await banco.close();
            }
            
                    
           
                    
        }
    }
    static async createDataHora(){
        let sql = 'CREATE TABLE IF NOT EXISTS datahora(id INTEGER  PRIMARY KEY AUTOINCREMENT, data TEXT, hora TEXT)';
        let banco = await bd.openDb();
        try{
            banco.exec(sql);
            console.log("Tabela 'datahora' criado com sucesso!")
        }finally{
            await banco.close();
        }
    }

    static async getDataHora(data_informada) {
        let json = { datas: [] };
    
        // Verifica se data_informada é uma instância válida de Date
        if (!(data_informada instanceof Date) || isNaN(data_informada)) {
            throw new RangeError('Invalid time value');
        }
    
        let banco = await bd.openDb();
        //let data_formatada = data_informada.toISOString().slice(0, 10);
        //console.log("data informada: " + data_formatada);
    
        let sql = `SELECT * FROM datahora `;
    
        try {
            await banco.all(sql).then(resultado => {
                console.log("Resultado");
                console.log(resultado[0]);
                //json.datas = resultado;
                resultado.forEach(elemento =>{
                    //jeito de corrigir o erro de passar string e dias sairem todos errados
                    var data_array = elemento?.data.split("-");
                    var data_banco = new Date(parseInt(data_array[0]), parseInt(data_array[1]), parseInt(data_array[2]));
                    console.log(data_banco);
                    var dia = data_banco.getDate();
                    var mes = data_banco.getMonth();
                    var ano = data_banco.getFullYear();
                    if((dia >= data_informada.getDate()) && (mes >= data_informada.getMonth()) && (ano >= data_informada.getFullYear()) ){
                        json.datas.push(elemento);
                    }
                });
                
            });
    
            console.log("json");
            console.log(json.datas);
            return json;
        } finally {
            banco.close();
        }
    }
    

}

module.exports = Agendamento;