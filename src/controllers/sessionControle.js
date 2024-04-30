const brcypt = require('bcryptjs');
const bd = require('../database/config');
//método para controle de usuarios
module.exports = {
    async create(usr){
        let sql = `SELECT usuario.login, usuario.senha FROM usuario WHERE usuario.login = '${usr.usuario}'`;
        let banco = await bd.openDb();
        let usuario_valido = false;
        try {
            await banco.get(sql).then(resultado =>{
                //console.log("Resultado:",resultado);
                if(brcypt.compareSync(usr.senha, resultado.senha) == true){
                    usuario_valido = true;
                }
            })
            return usuario_valido;
        } catch (error) {
           console.log('error na consulta', error) 
        }finally{
            await banco.close();
        }
    }
}
//const {usuario, senha} = request.body;
/*let sql = `SELECT * FROM usuario WHERE login = '${usuario}'`;
//verifica se a senha é válida e retorna o usuário
 await connect.query(sql, (error, [linha])=>{
    if(error) throw error;
    if(brcypt.compareSync(senha, linha.senha) == true){
        response.json(linha.usuario);
    }else{
        response.json({mensagem:"Senha invalida!"});
    }

 });
connect.end();*/