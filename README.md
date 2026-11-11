# 🐾 AdotePet - Sistema de Adoção Responsável de Animais

Projeto acadêmico completo desenvolvido para a disciplina de Engenharia de Software (2º Semestre) por uma equipe de 3 estudantes.

---

## 📋 Sumário
1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Estrutura de Pastas](#-estrutura-de-pastas)
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
4. [Banco de Dados MySQL](#-banco-de-dados-mysql)
5. [Como Executar o Projeto](#-como-executar-o-projeto)
6. [Operações CRUD Implementadas](#-operações-crud-implementadas)
7. [Testes da API e do Sistema](#-testes-da-api-e-do-sistema)

---

## 🐶 Sobre o Projeto

O **AdotePet** é uma plataforma que conecta pessoas interessadas em adotar cães e gatos a tutores e voluntários que resgataram animais e precisam de um lar responsável para eles.

### Páginas do Sistema:
- **Página Inicial (`index.html`)**: Logotipo, banner acolhedor, cards de animais em destaque e estatísticas de resgate.
- **Página de Animais (`animais.html`)**: Listagem dinâmica de todos os animais cadastrados no MySQL com filtros por espécie (Cão/Gato), porte (Pequeno/Médio/Grande) e busca textual.
- **Página de Detalhes (`detalhes.html`)**: Foto expandida, dados completos (nome, idade, espécie, porte, história e tutor responsável), com opções de editar e excluir para o tutor do pet.
- **Página de Cadastro de Animais (`cadastrar-animal.html`)**: Formulário intuitivo para inclusão ou alteração de animais no MySQL.
- **Página de Login (`login.html`)**: Autenticação com e-mail e validação de hash seguro da senha.
- **Página de Cadastro de Usuário (`cadastro.html`)**: Inclusão de novos usuários com validação de confirmação de senha.
- **Página Sobre (`sobre.html`)**: Informações acadêmicas da equipe e arquitetura do software.

---

## 📁 Estrutura de Pastas

```text
AdotePet/
├── backend/
│   ├── routes/
│   │   ├── animais.js      # Rotas das 4 operações CRUD de animais
│   │   └── usuarios.js     # Rotas de cadastro e login de usuários
│   ├── database.js         # Configuração do pool de conexões MySQL2
│   └── server.js           # Servidor Express e arquivos estáticos
├── database/
│   └── adotepet.sql        # Script DDL completo para MySQL Workbench
├── frontend/
│   ├── css/
│   │   └── style.css       # Estilização CSS3 (identidade Warm Shelter Minimal)
│   ├── js/
│   │   └── script.js       # Lógica do Front-End e requisições Fetch API
│   ├── animais.html        # Consulta e listagem dos animais
│   ├── cadastrar-animal.html # Formulário para cadastrar e editar animal
│   ├── cadastro.html       # Formulário de cadastro de usuário
│   ├── detalhes.html       # Visualização detalhada do pet selecionado
│   ├── index.html          # Página inicial e destaques
│   ├── login.html          # Página de login de usuário
│   └── sobre.html          # Página institucional sobre o projeto
├── .env                    # Variáveis de ambiente (credenciais locais)
├── .env.example            # Exemplo de configuração de variáveis
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Metadados e dependências do projeto
└── README.md               # Documentação detalhada
```

---

## 🛠️ Tecnologias Utilizadas

- **Front-End**: HTML5 semântico, CSS3 responsivo (Flexbox e Grid) e JavaScript puro (ES6+ com Fetch API).
- **Back-End**: Node.js com Express para organização das rotas REST.
- **Banco de Dados**: MySQL com driver `mysql2/promise` para consultas assíncronas preparadas (anti SQL Injection).
- **Segurança**: `bcryptjs` para geração de hash seguro das senhas dos usuários.
- **Variáveis de Ambiente**: `dotenv` para proteção de credenciais.

---

## 🗄️ Banco de Dados MySQL

### Como importar no MySQL Workbench:
1. Abra o **MySQL Workbench** e conecte-se à sua instância local (`Local instance MySQL`).
2. Clique no menu superior em **File** > **Open SQL Script...** (ou pressione `Ctrl + Shift + O`).
3. Selecione o arquivo `database/adotepet.sql`.
4. Clique no ícone do raio (**Execute**) para rodar todo o script.
5. No painel esquerdo (*Schemas*), clique com o botão direito e selecione **Refresh All**. O schema `adotepet` aparecerá com as tabelas `usuarios` e `animais` e os dados iniciais de teste.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos:
- Node.js instalado (versão 18 ou superior).
- MySQL instalado e em execução (via MySQL Workbench, XAMPP ou WampServer).

### Passo a Passo:
1. **Configurar as credenciais do banco no arquivo `.env`**:
   Abra o arquivo `.env` na raiz do projeto e ajuste de acordo com o seu MySQL local:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha_do_mysql
   DB_NAME=adotepet
   DB_PORT=3306
   ```

2. **Instalar as dependências**:
   No terminal da pasta do projeto, execute:
   ```bash
   npm install
   ```

3. **Iniciar o servidor**:
   ```bash
   npm start
   ```
   *(Ou no modo desenvolvimento com auto-reload: `npm run dev`)*

4. **Acessar o sistema**:
   Abra o navegador no endereço: [http://localhost:3000](http://localhost:3000)

---

## 🔄 Operações CRUD Implementadas

| Operação | Método HTTP | Rota API | Descrição |
|---|---|---|---|
| **Create** | `POST` | `/api/animais` | Cadastra um novo animal associado ao usuário logado |
| **Read** | `GET` | `/api/animais` | Retorna lista de animais (com suporte a filtros) |
| **Read** | `GET` | `/api/animais/:id` | Retorna os detalhes de um animal específico |
| **Update** | `PUT` | `/api/animais/:id` | Atualiza as informações de um animal existente |
| **Delete** | `DELETE` | `/api/animais/:id` | Exclui o registro de um animal do banco de dados |
