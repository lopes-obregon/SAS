const bcrypt = require('bcryptjs');
const bd = require('../database/config');
module.exports = {
    //mostrar usuario 
    async index(user){
        //console.log(user.usuario);
        let sql = `SELECT * FROM usuario JOIN paciente ON usuario.paciente_cpf = paciente.cpf WHERE usuario.login =  '${user.usuario}'`;
        //console.log(sql);
        let banco  = await bd.openDb();
        try{

            /*await bd.openDb().then(banco =>{
                banco.exec(sql).then(resultado =>{
                    return resultado;
                } )
            })*/
            return await banco.get(sql);
        }catch{
            console.log('Error ao consultar!');
        }finally{
            await banco.close();
        }
    },
    async insertUsr(user, cpf){
        //método para criar o usúario.
        
        //const {usuario, senha, nome,cpf, data_nascimento,  cadastro_sus, endereco, unidade_de_saude, } = request.body;
        //let cpf_numero = parseInt(cpf,10);
        //console.log(user);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.senha, salt);
        let banco = await bd.openDb();
        let permissao = '2';
        let sql = `INSERT INTO usuario (login, senha, permissoes, paciente_cpf) VALUES ('${user.usuario}', '${hash}', '${permissao}', '${cpf}')`;
        let txtResponse = "";
        try{
            await banco.exec(sql).then(()=>{
                txtResponse = "usuario: " + user.usuario + " criado com sucesso!";
            }).catch(err =>{
                console.log('Algo deu errado:', err);
                txtResponse = "Algo deu errado!";
                
            })
            
            return txtResponse;
        }finally{
            await banco.close();
                
        }
                
    },
    async createTable(){
        let banco = await bd.openDb();
        let sql = 'CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER  PRIMARY KEY AUTOINCREMENT, login TEXT, senha TEXT, permissoes TEXT, paciente_cpf INTEGER NOT NULL, FOREIGN KEY(paciente_cpf) REFERENCES paciente(cpf) ON DELETE NO ACTION ON UPDATE NO ACTION)';
        try {
           await banco.exec(sql);
        } catch (error) {
           console.log("Algo deu errado ao criar a tabela usuario:", error);
        }finally{
           await banco.close();
       }
    }

}

/**
 * CREATE TABLE IF NOT EXISTS usuario (
  idusuario INTEGER NOT NULL PRIMARY KEY,
  login TEXT,
  senha TEXT,
  permissoes TEXT,
  paciente_cpf INTEGER NOT NULL,
  FOREIGN KEY(paciente_cpf) REFERENCES paciente(cpf) ON DELETE NO ACTION ON UPDATE NO ACTION
);
 */