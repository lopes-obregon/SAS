//módulos importados
const bd = require('../database/config');
module.exports = {
    async createTable(){
      //cria tabelas
      let sql = 'CREATE TABLE IF NOT EXISTS preAgendamento(idPreAgendamento INTEGER  PRIMARY KEY AUTOINCREMENT, data TEXT, hora TEXT, paciente_cpf INTEGER NOT NULL, FOREIGN KEY(paciente_cpf) REFERENCES paciente(cpf) ON DELETE NO ACTION ON UPDATE NO ACTION)';
      let banco = await bd.openDb();
      try {
        await banco.exec(sql);
      } catch (error) {
        console.log("Error encontrado no Pré Agendamento:",error)
      }finally{
        await banco.close();
      }

    }
}