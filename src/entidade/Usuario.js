//importa a clase paciente
var Paciente = require("./Paciente");
const bd = require("../database/config");
const bcrypt = require("bcryptjs");
//define a classe
/*function Usuario(cpf = 0, nome = "", data_nascimento = "", cadastro_sus = "", endereco = "", unidade_de_saude = "", login="", senha="", permissao="2"){
    Paciente.call(this,cpf, nome, data_nascimento, cadastro_sus, endereco, unidade_de_saude);
    this.login = login;
    this.senha = senha;
    this.permissao = permissao;
}*/
class Usuario extends Paciente {
  constructor(
    cpf = 0,
    nome = "",
    data_nascimento = "",
    cadastro_sus = "",
    endereco = "",
    unidade_de_saude = "",
    login = "",
    senha = "",
    permissao = "2"
  ) {
    super(cpf, nome, data_nascimento, cadastro_sus, endereco, unidade_de_saude);
    this.login = login;
    this.senha = senha;
    this.permissao = permissao;
  }
  //seta login
  setLogin(novo_login) {
    this.login = novo_login;
  }
  //retorna cpf do pai
  getCpf() {
    return super.getCpf();
  }
  //cria tabela no banco de dados
  static async createTable() {
    //método para criar tabela usario no banco de dados
    let banco = await bd.openDb();
    let sql =
      "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER  PRIMARY KEY AUTOINCREMENT, login TEXT, senha TEXT, permissoes TEXT, paciente_cpf INTEGER NOT NULL, FOREIGN KEY(paciente_cpf) REFERENCES paciente(cpf) ON DELETE NO ACTION ON UPDATE NO ACTION)";
    try {
      await banco.exec(sql);
    } catch (error) {
      console.log("Algo deu errado ao criar a tabela usuario:", error);
    } finally {
      await banco.close();
    }
  }
  //verifica quais usuarios tem o mesmo atributo e torna verdadeiro ou falso
  static async usuarioMesmoAtributos(usuario) {
    if (usuario instanceof Usuario) {
      let banco = await bd.openDb();
      let n_paciente_mesmo_atributo = 0;
      try {
        let sql = `SELECT COUNT(idusuario)  AS count from usuario WHERE  login='${usuario.login}'`;
        await banco
          .get(sql)
          .then((result) => {
            n_paciente_mesmo_atributo = result.count;
          })
          .catch((error) => console.log("Algo deu errado na contagem", error));
        if (n_paciente_mesmo_atributo > 0) {
          return true;
        } else {
          return false;
        }
      } finally {
        await banco.close();
      }
    }
  }
  //inserir usuario ao banco
  static async inserirUsuario(usuario) {
    //verificando se paciente é uma instancia de usuario;
    if (usuario instanceof Usuario) {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(usuario.senha, salt);
      let banco = await bd.openDb();
      let numero_cpf = usuario.getCpf();

      let sql = `INSERT INTO usuario (login, senha, permissoes, paciente_cpf) VALUES ('${usuario.login}', '${hash}', '${usuario.permissao}', ${numero_cpf})`;
      console.log(sql);
      try {
        await banco
          .exec(sql)
          .then(() => {
            return { success: true, error: "Usuário inserido com sucesso!" };
          })
          .catch((err) => {
            console.log("Error na inserção:", err);
            return { error: "Error ao inserir o Usuario" };
          });
      } finally {
        await banco.close();
      }
    }
  }
  //método para obter usuario informado
  static async getUsuario(usuario) {
    let banco = await bd.openDb();
    try {
      //verifica se é instancia de usuario
      if (usuario instanceof Usuario) {
        //realiza a sql
        let sql = `SELECT paciente.cpf, paciente.nome, paciente.data_nascimento, paciente.cadastro_sus, paciente.endereco, paciente.unidade_de_saude FROM usuario JOIN paciente ON usuario.paciente_cpf = paciente.cpf WHERE usuario.login = '${usuario.login}'`;

        //realiza a consulta e retorna uma unica linha
        await banco.get(sql).then((resultado) => {
          /**
           * depois da consulta seta os atributos da classe usuario
           */
          usuario.cpf = resultado.cpf;
          usuario.nome = resultado.nome;
          usuario.data_nascimento = resultado.data_nascimento;
          usuario.cadastro_sus = resultado.cadastro_sus;
          usuario.endereco = resultado.endereco;
          usuario.unidade_de_saude = resultado.unidade_de_saude;
        });
      }
    } finally {
      await banco.close();
    }
  }
}

module.exports = Usuario;
