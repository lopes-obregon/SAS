<h1 align="center">🩺 SAS - Sistema Ambientado à Saúde</h1>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=yellow&style=for-the-badge"/>
  <img src="https://img.shields.io/github/stars/lopes-obregon/SAS?style=social"/>
  <img src="https://img.shields.io/github/languages/top/lopes-obregon/SAS?color=blue&style=for-the-badge"/>
  <img src="https://img.shields.io/github/last-commit/lopes-obregon/SAS?color=green&style=for-the-badge"/>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge"/>
  </a>
</p>

<p align="center">
  Um sistema backend robusto para gerenciamento de clínicas e hospitais.
</p>

---

## 📑 Índice

* [📌 Descrição do Projeto](#-descrição-do-projeto)
* [⚙️ Funcionalidades](#-funcionalidades)
* [🧪 Screenshots](#-screenshots)
* [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
* [🛠️ Tecnologias Usadas](#-tecnologias-usadas)
* [🗄️ Esquema do Banco de Dados](#-esquema-do-banco-de-dados)
* [👥 Contribuidores](#-contribuidores)
* [📄 Licença](#-licença)

---

## 📌 Descrição do Projeto

O **SAS - Sistema Ambientado à Saúde** é um sistema **backend robusto e modular** desenvolvido para otimizar o gerenciamento de operações no setor da saúde. Sua principal finalidade é **facilitar o pré-agendamento de consultas e o controle completo de atendimentos médicos** em clínicas, hospitais ou consultórios.

O sistema centraliza o gerenciamento de:
* **Pacientes:** Cadastro e atualização de informações detalhadas.
* **Médicos:** Gerenciamento completo dos dados dos profissionais de saúde.
* **Consultas e Agendamentos:** Controle eficaz de datas, horários e vínculo entre médicos e pacientes.
* **Autenticação de Usuários:** Um sistema de login seguro para controle de acesso.

Com uma arquitetura pensada para escalabilidade e fácil integração com futuras interfaces (web ou mobile), o SAS visa ser a espinha dorsal para um ambiente de saúde mais organizado e eficiente.

---

## ⚙️ Funcionalidades

O SAS oferece um conjunto de funcionalidades essenciais para a gestão da saúde, estruturadas para otimizar o fluxo de trabalho:

* **Cadastro e Gerenciamento de Pacientes:**
    * Criação de novos registros de pacientes com informações pessoais e de contato.
    * Atualização e consulta de dados de pacientes existentes.
    * Remoção lógica de registros de pacientes (se aplicável, para histórico).
* **Cadastro e Gerenciamento de Médicos:**
    * Registro de novos profissionais de saúde, incluindo especialidade e informações de contato.
    * Manutenção e consulta de dados de médicos.
    * Associação de médicos a agendamentos e consultas.
* **Agendamento de Consultas:**
    * Criação de agendamentos com data, hora, médico e paciente associados.
    * Visualização e gerenciamento de agendas médicas.
    * Atualização do status de consultas (confirmada, realizada, cancelada).
* **Sistema de Autenticação e Autorização:**
    * Login seguro para usuários do sistema (administradores, recepcionistas, etc.).
    * Controle de acesso baseado em perfis (garantindo que apenas usuários autorizados realizem certas operações).
* **APIs RESTful:**
    * Exposição de endpoints para todas as operações de gerenciamento (CRUD para pacientes, médicos, consultas), permitindo fácil integração com frontends diversos.

---



## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o backend do SAS em seu ambiente local.

### Pré-requisitos

Certifique-se de ter o seguinte software instalado em sua máquina:
* [**Node.js**](https://nodejs.org/en/download/) (versão LTS recomendada)
* [**npm**](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js, geralmente vem com o Node.js)

### Configuração e Inicialização

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/lopes-obregon/SAS.git](https://github.com/lopes-obregon/SAS.git)
    cd SAS
    ```

2.  **Instale as Dependências:**
    Navegue até o diretório raiz do projeto e instale as dependências do Node.js:
    ```bash
    npm install
    ```

3.  **Configuração do Banco de Dados (SQLite):**
    O projeto utiliza **SQLite** como banco de dados local, o que simplifica a configuração.
    * **Verifique o script de criação:** O arquivo `script-SAS-mysql2.sql` (ou equivalente) pode ser uma referência para a estrutura do banco de dados. No entanto, com SQLite, geralmente o banco de dados é criado automaticamente na primeira execução ou ao importar um arquivo `.sql` pré-existente.
    * **Importe o esquema (se necessário):** Se o seu projeto não criar o banco de dados automaticamente, você pode precisar de um arquivo `.sql` para inicializar a estrutura. Certifique-se de que o arquivo `script-SAS-mysql2.sql` esteja configurado para SQLite, ou crie um novo.
        * *(**Sugestão:** Inclua um arquivo `database.sqlite` vazio no `.gitignore` e um `schema.sql` com as `CREATE TABLE` statements que serão executadas por um script na primeira inicialização, ou por uma ferramenta de migração de ORM.)*

4.  **Inicie o Servidor:**
    Após instalar as dependências e configurar o banco de dados, inicie o servidor backend:
    ```bash
    node server.js
    ```
    O servidor estará ativo e respondendo às requisições na porta configurada (geralmente `http://localhost:3000` ou `8080`). Verifique o console para a mensagem de confirmação.

---

## 🛠️ Tecnologias Usadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

* **Linguagem de Programação:** `JavaScript`
* **Backend:** `Node.js` (com a utilização de frameworks como `Express.js` para as APIs RESTful - *se aplicável, adicione aqui*)
* **Banco de Dados:** `SQLite` (para persistência de dados local e eficiente)
* **Gerenciamento de Pacotes:** `npm`
* *(**Adicione outras tecnologias relevantes, ex: `bcrypt` para hash de senhas, `jsonwebtoken` para autenticação JWT, etc.**)*

---

## 🗄️ Esquema do Banco de Dados

O banco de dados do SAS é composto pelas seguintes tabelas principais para gerenciar as entidades do sistema:

**Nome do Banco de Dados:** `sas_database.sqlite` (ou o nome do arquivo .db gerado)

| Tabela       | Colunas Principais                                       | Descrição                                         |
| :----------- | :------------------------------------------------------- | :------------------------------------------------ |
| `pacientes`  | `id`, `nome`, `dataNascimento`, `contato`, `historico`   | Armazena dados dos pacientes                     |
| `medicos`    | `id`, `nome`, `especialidade`, `crm`, `contato`          | Gerencia informações dos profissionais de saúde |
| `consultas`  | `id`, `idPaciente`, `idMedico`, `dataHora`, `status`     | Registra os agendamentos de consultas            |
| `usuarios`   | `id`, `username`, `password_hash`, `role`              | Gerencia usuários do sistema e seus acessos      |

*(**Sugestão:** Se o `script-SAS-mysql2.sql` tiver o esquema completo, você pode linká-lo aqui ou transcrevê-lo para maior clareza.)*

---


## 👥 Contribuidores

Este projeto foi desenvolvido por:
| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/45721862?v=4" width=115><br><sub>Renan Lopes Obregon</sub>](https://github.com/lopes-obregon) 
| :---: |
---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**.

A Licença MIT é uma licença de software livre permissiva que permite a livre utilização, modificação e distribuição do código-fonte, desde que a notificação de direitos autorais e a própria licença sejam incluídas em todas as cópias ou partes substanciais do software.

Para mais detalhes, consulte o arquivo [LICENSE](LICENSE) na raiz deste repositório.

---
