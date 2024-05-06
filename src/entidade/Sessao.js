const brcypt = require('bcryptjs');
const bd = require('../database/config');

class Sessao{
    constructor(usuario, senha){
        this.usuario = usuario;
        this.senha = senha;
    }
    //consulta no banco o usuario e depois compara se as senhas são iguais
    static async  verificaLogin(sessao){
        //método que verifica se a senha do usuario é valido.
        if(sessao instanceof Sessao){
            let sql = `SELECT usuario.login, usuario.senha FROM usuario WHERE usuario.login = '${sessao.usuario}'`;
            let banco = await bd.openDb();
            let usuario_valido = false;
            try {
                await banco.get(sql).then(resultado =>{
                    //console.log("Resultado:",resultado);
                    if(brcypt.compareSync(sessao.senha, resultado.senha) == true){
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
}
module.exports = Sessao;