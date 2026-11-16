# 🎓 GUIA DE APRESENTAÇÃO TÉCNICA — ADOTEPET
**Manual de Fala e Demonstração para a Banca / Professor**  
*Engenharia de Software — 2º Semestre*

---

## 👥 Divisão da Equipe (3 Integrantes)

- **1. Pedro Sohn:** Responsável pelo **Front-End** (HTML5 Semântico, CSS3 e Lógica do Cliente);
- **2. João Gabriel:** Responsável pelo **Back-End** (Node.js, Express e Rotas da API REST);
- **3. Leonardo Lisboa:** Responsável pelo **Banco de Dados** (MySQL, Modelagem DDL, Regras de Negócio e Demonstração do CRUD).

---

## 🧭 1. Frase de Abertura para a Apresentação

> *"Professor, o nosso sistema **AdotePet** foi desenvolvido seguindo o padrão clássico de **Arquitetura em Três Camadas (3-Tier)**:
> 1. A camada de **Apresentação (Front-End)** feita com HTML5, CSS3 e JavaScript puro;
> 2. A camada de **Aplicação (Back-End)** construída com Node.js e Express rodando localmente na porta 3000;
> 3. A camada de **Persistência de Dados (Banco de Dados)** utilizando o MySQL na porta 3306.
> 
> O sistema funciona de forma 100% local, consumindo a nossa própria API REST via requisições HTTP assíncronas com a `Fetch API`."*

---

## 🎨 2. Como Explicar o FRONT-END

### Formulários em HTML5:
> *"No Front-End, mantivemos a estrutura em **HTML5 semântico puro**, sem frameworks complexos. Nos formulários de cadastro e login, utilizamos:*
> - *Validação nativa com o atributo `required`, impedindo envios com campos em branco;*
> - *Inputs com tipos específicos (`email`, `password`, `url`) para validação automática do navegador;*
> - *Tags `<select>` para Espécie (`cachorro` ou `gato`) e Porte (`pequeno`, `medio`, `grande`), padronizando os dados que vão para o banco;*
> - *Tag `<textarea>` para a descrição detalhada do pet."*

### Estilização em CSS3:
> *"A identidade visual é baseada no padrão **Warm Shelter Minimal**:*
> - *Paleta de cores acolhedora com verde claro (`#52B788`), bege suave (`#FAF8F5`) e cartões em branco puro (`#FFFFFF`);*
> - *Botões com cantos arredondados (`border-radius: 9999px`) e sombras suaves;*
> - *Layout responsivo estruturado com **Flexbox** e **CSS Grid** (`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`), que se adapta perfeitamente a computadores, tablets e celulares através de `@media queries`."*

### JavaScript do Cliente (`frontend/js/script.js`):
> *"O nosso JavaScript é direto e fácil de entender:*
> - *`listarAnimais()`: faz um `fetch()` na nossa rota `GET /api/animais` e desenha os cards na tela usando o `.innerHTML`;*
> - *`salvarAnimal()`: captura os dados do formulário com `document.getElementById` e dispara o `POST` (para cadastrar) ou `PUT` (para editar);*
> - *`excluirAnimal()`: solicita confirmação com `confirm()` e executa a exclusão via `DELETE`;*
> - *`localStorage`: salva o usuário logado para manter o menu atualizado com o nome dele e o botão de cadastrar pets."*

---

## ⚙️ 3. Como Explicar o BACK-END (Node.js e Express)

### Servidor Express (`backend/server.js`):
> *"O servidor roda no Node.js com o framework Express. Configuramos middlewares essenciais:*
> - *`express.json()`: para interpretar os dados recebidos em formato JSON;*
> - *`express.static()`: que entrega diretamente todas as páginas HTML, CSS e JS da pasta `frontend/`, permitindo que o sistema funcione na raiz `http://localhost:3000`;*
> - *Separação em rotas modulares: `/api/animais` para o CRUD de pets e `/api/usuarios` para cadastro e login."*

### Implementação do CRUD (`backend/routes/animais.js`):
> *"No arquivo de rotas de animais, implementamos as quatro operações do CRUD:*
> 1. ***CREATE (`POST /api/animais`)**: Insere o animal no MySQL com o comando `INSERT INTO animais (...)`;*
> 2. ***READ (`GET /api/animais` e `GET /api/animais/:id`)**: Consulta os animais salvos no banco com o comando `SELECT * FROM animais`;*
> 3. ***UPDATE (`PUT /api/animais/:id`)**: Atualiza os dados de um animal existente com o comando `UPDATE animais SET ... WHERE id = ?`;*
> 4. ***DELETE (`DELETE /api/animais/:id`)**: Remove o animal do banco com o comando `DELETE FROM animais WHERE id = ?`."*

---

## 🗄️ 4. Como Explicar o BANCO DE DADOS (MySQL)

### Modelagem e Script DDL (`database/adotepet.sql`):
> *"No MySQL Workbench, criamos o banco `adotepet` com duas tabelas relacionais na proporção **1 para N**:*
> - *A tabela **`usuarios`**: com `id` (chave primária auto-increment), `nome`, `email` com restrição `UNIQUE` e `senha`;*
> - *A tabela **`animais`**: com `id`, `nome`, `especie`, `idade`, `porte`, `descricao`, `foto` e a chave estrangeira **`usuario_id`** vinculada a `usuarios(id)`;*
> - *Integridade referencial configurada com **`ON DELETE CASCADE`**: se um usuário for excluído, todos os pets que ele cadastrou são excluídos automaticamente pelo MySQL, evitando registros órfãos."*

### Conexão com o Banco (`backend/database.js`):
> *"Utilizamos a biblioteca **`mysql2/promise`** configurando um Pool de conexões. Isso garante que as operações assíncronas com `async/await` sejam rápidas e que o banco reutilize as conexões abertas de forma eficiente."*

### Consultas SQL Utilizadas pelo Sistema (Prepared Statements):
> *"O nosso Back-End executa consultas SQL nativas parametrizadas:*
> - **Listar animais:** `SELECT * FROM animais ORDER BY id DESC`
> - **Buscar animal por ID:** `SELECT * FROM animais WHERE id = ?`
> - **Inserir novo animal:** `INSERT INTO animais (nome, especie, idade, porte, descricao, foto, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)`
> - **Atualizar animal:** `UPDATE animais SET nome = ?, especie = ?, idade = ?, porte = ?, descricao = ?, foto = ? WHERE id = ?`
> - **Excluir animal:** `DELETE FROM animais WHERE id = ?`
> - **Autenticação de usuário:** `SELECT * FROM usuarios WHERE email = ? AND senha = ?`"*

---

## 🛡️ 5. Regras de Negócio e Segurança (Ponto Forte da Apresentação!)

### 1. Como Evitamos SQL Injection:
> *"Professor, nós não concatenamos variáveis diretamente no texto do SQL. Usamos **Prepared Statements** com marcadores de interrogação `?`:*
> ```javascript
> const sql = 'INSERT INTO animais (nome, especie, idade, porte, descricao, foto, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
> await pool.query(sql, [nome, especie, idade, porte, descricao, foto, usuario_id]);
> ```
> *O driver `mysql2` sanitiza os parâmetros automaticamente antes de entregar ao MySQL, neutralizando qualquer tentativa de injeção de código SQL malicioso."*

### 2. Controle de Acesso por Dono (Quem pode apagar/editar):
> *"Implementamos uma regra de negócio importante:*
> - *Visitantes sem login não podem cadastrar, editar nem excluir animais;*
> - *Um usuário logado **só pode editar e excluir os animais que ele mesmo cadastrou**;*
> - *Na tela de detalhes, se o usuário não for o dono do pet, os botões de Editar e Excluir ficam invisíveis;*
> - *No backend, a rota `DELETE` e `PUT` confere se o `usuario_id` que enviou a requisição bate com o dono do animal no MySQL. Se for diferente, retorna status `403 Forbidden`."*

---

## 🎬 6. Roteiro Passo a Passo para Demonstrar ao Vivo

Quando o professor pedir para ver o sistema funcionando:

1. **Mostrar o terminal:**
   - Execute: `npm start`
   - Aponte para a mensagem:  
     ` Conectado ao MySQL com sucesso!`  
     `🐾 Servidor rodando em: http://localhost:3000`

2. **Abrir o navegador em `http://localhost:3000`:**
   - Mostre a página inicial e os pets carregados diretamente do MySQL;
   - Clique na aba **Animais** e mostre os botões de filtro: clique em **Somente Cães** e **Somente Gatos**.

3. **Demonstrar a Permissão de Visitante:**
   - Abra um animal qualquer e mostre:  
     *"Professor, como visitante deslogado, eu só posso ler a história e clicar em 'Quero Adotar'. Não aparecem opções de editar ou excluir."*

4. **Fazer Login:**
   - Clique em **Entrar** e digite:
     - E-mail: `admin@adotepet.com`
     - Senha: `12345678`
   - Mostre que o menu agora exibe *"Olá, Administrador AdotePet"* e o botão **+ Cadastrar Pet**.

5. **Testar o CREATE (Cadastrar Pet):**
   - Clique em **+ Cadastrar Pet**;
   - Preencha: Nome "Max", Espécie "Cachorro", Porte "Médio", Idade "2 anos", Descrição "Cão companheiro e vacinado";
   - Clique em **Salvar Animal**. O alerta confirma a inclusão e redireciona para a lista.

6. **Testar o UPDATE (Alterar Pet):**
   - Abra o Max na lista de detalhes. Como você é o dono, os botões **✏️ Editar** e **🗑️ Excluir** aparecem;
   - Clique em **Editar**, mude a idade para "3 anos" e salve. Mostre que atualizou.

7. **Testar o DELETE (Excluir Pet):**
   - Na página do Max, clique no botão vermelho **🗑️ Excluir**;
   - Confirme no alerta. O Max sumirá da tela na hora.

8. **Comprovar no MySQL Workbench:**
   - Alterne para o Workbench e rode os comandos da seção abaixo;
   - Mostre que o banco de dados refletiu fielmente tudo o que você fez na interface!

---

## 💾 7. Comandos de Consulta no Banco de Dados (MySQL Workbench)

> *Use estes comandos no **MySQL Workbench** ou terminal do MySQL durante a apresentação para demonstrar domínio prático de SQL ao professor.*

### 0. Conectar ao Banco de Dados
```sql
USE adotepet;
```

---

### 1. Consultas Básicas de Listagem (Read)

* **Listar todos os animais com todas as colunas:**
  ```sql
  SELECT * FROM animais;
  ```
  *(O que falar: "Professor, esta é a consulta geral que traz todos os registros da tabela animais.")*

* **Listar os animais do mais recente para o mais antigo (igual ao Front-End):**
  ```sql
  SELECT id, nome, especie, porte, idade, criado_em 
  FROM animais 
  ORDER BY id DESC;
  ```
  *(O que falar: "Esta é exatamente a consulta executada pela nossa rota GET /api/animais, ordenando pelos cadastros mais recentes no topo.")*

* **Consultar dados de um animal específico por ID:**
  ```sql
  SELECT * FROM animais WHERE id = 1;
  ```
  *(O que falar: "Consulta utilizada na tela de detalhes do animal através do parâmetro de rota :id.")*

---

### 2. Consultas com Filtros (`WHERE`)

* **Filtrar apenas cães:**
  ```sql
  SELECT id, nome, porte, idade 
  FROM animais 
  WHERE especie = 'cachorro';
  ```

* **Filtrar apenas gatos:**
  ```sql
  SELECT id, nome, porte, idade 
  FROM animais 
  WHERE especie = 'gato';
  ```
  *(O que falar: "Equivalente aos botões de filtro rápido que temos na interface web.")*

* **Filtrar por porte (ex: animais de porte pequeno):**
  ```sql
  SELECT id, nome, especie, idade 
  FROM animais 
  WHERE porte = 'pequeno';
  ```

* **Buscar animal por nome ou termo de busca:**
  ```sql
  SELECT id, nome, especie, porte 
  FROM animais 
  WHERE nome LIKE '%Pipoca%';
  ```

---

### 3. Consulta Relacional Avançada (`INNER JOIN`)
*(Excelente para impressionar a banca mostrando o relacionamento 1:N entre as tabelas)*

* **Listar cada animal com o nome e e-mail do seu respectivo tutor/dono:**
  ```sql
  SELECT 
      a.id AS id_animal,
      a.nome AS nome_pet,
      a.especie,
      a.porte,
      u.nome AS tutor_responsavel,
      u.email AS contato_tutor
  FROM animais a
  INNER JOIN usuarios u ON a.usuario_id = u.id
  ORDER BY a.id ASC;
  ```
  *(O que falar: "Professor, aqui realizamos um INNER JOIN unindo a tabela animais com a tabela usuarios através da chave estrangeira usuario_id. Isso comprova a integridade referencial da modelagem relacional 1 para N.")*

---

### 4. Consultas de Agregação e Estatísticas (`COUNT` e `GROUP BY`)

* **Quantidade total de animais disponíveis para adoção:**
  ```sql
  SELECT COUNT(*) AS total_animais FROM animais;
  ```

* **Contagem de animais agrupados por espécie (Cães vs Gatos):**
  ```sql
  SELECT especie, COUNT(*) AS quantidade 
  FROM animais 
  GROUP BY especie;
  ```
  *(O que falar: "Demonstra o uso de funções de agregação GROUP BY e COUNT no MySQL.")*

* **Contagem de pets cadastrados por cada tutor:**
  ```sql
  SELECT 
      u.nome AS tutor,
      COUNT(a.id) AS total_cadastrados
  FROM usuarios u
  LEFT JOIN animais a ON u.id = a.usuario_id
  GROUP BY u.id, u.nome;
  ```

---

### 5. Consultas de Usuários e Autenticação

* **Listar todos os usuários cadastrados:**
  ```sql
  SELECT id, nome, email, criado_em FROM usuarios;
  ```

* **Simulação da consulta de login executada pelo Back-End:**
  ```sql
  SELECT id, nome, email 
  FROM usuarios 
  WHERE email = 'admin@adotepet.com' AND senha = '12345678';
  ```
  *(O que falar: "Esta é a validação de credenciais feita pela rota POST /api/usuarios/login.")*

---

### 6. Roteiro de Prova do CRUD no Workbench (Para rodar ao vivo)

| Etapa da Demonstração | Comando SQL para rodar no Workbench | O que comprova |
|---|---|---|
| **Antes do cadastro** | `SELECT COUNT(*) FROM animais;` | Número inicial de pets no banco |
| **Após criar o pet na tela** | `SELECT * FROM animais ORDER BY id DESC LIMIT 1;` | Mostra o novo animal inserido com seu `id` e `usuario_id` |
| **Após editar o pet na tela** | `SELECT id, nome, idade FROM animais WHERE nome = 'Max';` | Mostra a idade alterada no banco |
| **Após excluir o pet na tela** | `SELECT * FROM animais WHERE nome = 'Max';` | Retorna vazio (`0 rows`), provando a exclusão definitiva |

