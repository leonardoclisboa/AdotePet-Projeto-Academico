# 🐾 AdotePet - Sistema de Adoção Responsável de Animais

Projeto acadêmico Full Stack desenvolvido para a disciplina de Engenharia de Software (2º Semestre) por uma equipe de 3 estudantes.

O sistema é uma plataforma completa de adoção de animais com formulários HTML5, estilização em CSS3 (*Warm Shelter Minimal*), backend em Node.js com Express e persistência de dados em MySQL.

---

## 📋 Sumário
1. [Integrantes da Equipe](#-integrantes-da-equipe)
2. [Sobre o Projeto](#-sobre-o-projeto)
3. [Estrutura de Pastas](#-estrutura-de-pastas)
4. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
5. [Banco de Dados MySQL](#-banco-de-dados-mysql)
6. [Como Executar o Projeto](#-como-executar-o-projeto)
7. [Operações CRUD Implementadas](#-operações-crud-implementadas)
8. [Regras de Negócio e Segurança](#-regras-de-negócio-e-segurança)
9. [Documentação para Apresentação](#-documentação-para-apresentação)

---

## 👥 Integrantes da Equipe

| Nome do Estudante | RA / Matrícula | Responsabilidade no Projeto |
|---|---|---|
| **Pedro Sohn** | `[47972513]` | Front-End, HTML5 Semântico e Estilização CSS3 |
| **João Gabriel** | `[47720093]` | Back-End, Node.js e Rotas Express |
| **Leonardo Lisboa** | `[47818930]` | Banco de Dados, Modelagem DDL, Regras de Negócio e Apresentação |

---

---

## 🐶 Sobre o Projeto

O **AdotePet** conecta pessoas interessadas em adotar cães e gatos a tutores e voluntários que resgataram animais e precisam de um lar responsável para eles.

### Páginas do Sistema:
- **Página Inicial (`index.html`)**: Logotipo, banner acolhedor, cards de animais em destaque carregados do MySQL e link para cadastro.
- **Página de Animais (`animais.html`)**: Catálogo com filtros por espécie (Todos, Cães ou Gatos) e botões dinâmicos.
- **Página de Detalhes (`detalhes.html`)**: Foto do pet, idade, porte, espécie, história e botão de interesse na adoção. Exibe opções de **Editar** e **Excluir** exclusivamente se o usuário logado for o dono do animal.
- **Página de Cadastro de Animais (`cadastrar-animal.html`)**: Formulário intuitivo para inclusão ou edição de animais no banco de dados.
- **Página de Login (`login.html`)**: Autenticação de usuários.
- **Página de Cadastro de Usuário (`cadastro.html`)**: Registro de novos usuários com confirmação de senha.
- **Página Sobre (`sobre.html`)**: Apresentação da equipe de estudantes e arquitetura acadêmica do sistema.

---

## 📁 Estrutura de Pastas

```text
AdotePet/
├── backend/
│   ├── routes/
│   │   ├── animais.js              # Rotas das 4 operações CRUD de animais com trava de dono
│   │   └── usuarios.js             # Rotas de cadastro e login de usuários
│   ├── database.js                 # Conexão com o MySQL usando Pool (mysql2)
│   └── server.js                   # Servidor Express e entrega dos arquivos estáticos
├── database/
│   ├── adotepet.sql                # Script DDL oficial para criação do banco e tabelas
│   └── consultas_e_comandos.sql    # Comandos prontos de teste e consultas para o Workbench
├── frontend/
│   ├── css/
│   │   └── style.css               # Estilização CSS3 (identidade Warm Shelter Minimal)
│   ├── js/
│   │   └── script.js               # Lógica do Front-End e requisições Fetch API
│   ├── animais.html                # Catálogo de animais com filtros
│   ├── cadastrar-animal.html       # Formulário para cadastrar e editar animal
│   ├── cadastro.html               # Formulário de cadastro de usuário
│   ├── detalhes.html               # Visualização detalhada do pet selecionado
│   ├── index.html                  # Página inicial com animais em destaque
│   ├── login.html                  # Página de login de usuário
│   └── sobre.html                  # Página institucional da equipe
├── .env                            # Variáveis de ambiente (credenciais locais do MySQL)
├── .env.example                    # Modelo oficial de variáveis de ambiente
├── .gitignore                      # Arquivos ignorados pelo Git (node_modules, .env)
├── package.json                    # Dependências e scripts do Node.js
├── DOCUMENTACAO_TECNICA.md         # Documentação técnica completa do projeto
├── GUIA_EXPLICACAO_PROFESSOR.md    # Roteiro de fala e guia para a apresentação
└── README.md                       # Apresentação do repositório
```

---

## 🛠️ Tecnologias Utilizadas

- **Front-End**: HTML5 semântico, CSS3 puro responsivo (Flexbox e Grid) e JavaScript nativo com `Fetch API`.
- **Back-End**: Node.js com framework Express rodando localmente na porta `3000`.
- **Banco de Dados**: MySQL rodando localmente na porta `3306`, com driver `mysql2/promise`.
- **Variáveis de Ambiente**: Biblioteca `dotenv` para isolar credenciais locais no arquivo `.env`.

> **Nota Acadêmica:** Não foram utilizados frameworks front-end complexos (como React ou Angular), atendendo aos requisitos pedagógicos do 2º semestre de Engenharia de Software.

---

## 🗄️ Banco de Dados MySQL

### Como criar o banco no MySQL Workbench:
1. Abra o **MySQL Workbench** e conecte-se à sua instância local.
2. No menu superior, vá em **File ➔ Open SQL Script...** (ou pressione `Ctrl + Shift + O`).
3. Selecione o arquivo [`database/adotepet.sql`](database/adotepet.sql).
4. Clique no ícone do raio (**Execute ⚡**) para executar o script.
5. No painel esquerdo (*Schemas*), clique no botão de atualizar (**Refresh 🔄**). O schema `adotepet` aparecerá com as tabelas `usuarios` e `animais` com dados de teste já cadastrados.

### Comandos de Consulta e Testes no Workbench:
Para consultar dados, testar comandos `JOIN`, contagens (`COUNT`, `GROUP BY`) e testar o CRUD manualmente, utilize o arquivo:
👉 [`database/consultas_e_comandos.sql`](database/consultas_e_comandos.sql)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos:
- Node.js instalado (versão 18 ou superior).
- MySQL em execução (via MySQL Workbench, XAMPP ou WampServer).

### Passo a Passo:

1. **Configurar as credenciais do banco:**
   Verifique o arquivo `.env` na raiz do projeto e certifique-se de que a senha do seu MySQL está correta:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha_do_mysql
   DB_NAME=adotepet
   DB_PORT=3306
   ```
   *(Caso utilize XAMPP sem senha, deixe `DB_PASSWORD=` em branco).*

2. **Instalar as dependências:**
   No terminal da pasta do projeto, execute:
   ```bash
   npm install
   ```

3. **Iniciar o servidor:**
   ```bash
   npm start
   ```
   *(Ou no modo de desenvolvimento com reinicialização automática: `npm run dev`)*

4. **Acessar a aplicação:**
   Abra o navegador no endereço: [http://localhost:3000](http://localhost:3000)

---

## 🔄 Operações CRUD Implementadas

| Operação CRUD | Método HTTP | Rota Local | Descrição |
|---|---|---|---|
| **Create** | `POST` | `/api/animais` | Cadastra um novo animal vinculado ao tutor logado |
| **Read** | `GET` | `/api/animais` | Retorna todos os animais cadastrados no MySQL |
| **Read** | `GET` | `/api/animais/:id` | Retorna os detalhes de um animal específico por ID |
| **Update** | `PUT` | `/api/animais/:id` | Atualiza os dados do animal (somente o dono do pet) |
| **Delete** | `DELETE` | `/api/animais/:id` | Remove o registro do animal (somente o dono do pet) |

---

## 🛡️ Regras de Negócio e Segurança

1. **Prevenção contra SQL Injection:**
   Todas as consultas SQL no backend utilizam **Prepared Statements** com o operador `?`, garantindo que os parâmetros sejam sanitizados pelo driver `mysql2`.

2. **Controle de Acesso por Dono do Registro:**
   - **Visitantes sem login:** Podem visualizar os animais e manifestar interesse em adoção, mas não visualizam opções de editar ou excluir.
   - **Usuários cadastrados:** Só podem editar ou excluir os animais que **eles mesmos cadastraram** (`usuario_id === animal.usuario_id`). O backend valida essa permissão no banco antes de executar `PUT` ou `DELETE`.

---

## 📚 Documentação para Apresentação

Para apoiar a apresentação do trabalho ao professor e à banca, foram elaborados dois guias complementares:

- 📄 [`DOCUMENTACAO_TECNICA.md`](DOCUMENTACAO_TECNICA.md): Documento técnico formal com Diagrama Entidade-Relacionamento (DER em Mermaid), dicionário de dados detalhado, arquitetura e matriz de testes do CRUD.
- 🗣️ [`GUIA_EXPLICACAO_PROFESSOR.md`](GUIA_EXPLICACAO_PROFESSOR.md): Roteiro de apresentação com divisão de fala para os 4 integrantes da equipe e passo a passo para demonstração ao vivo.
