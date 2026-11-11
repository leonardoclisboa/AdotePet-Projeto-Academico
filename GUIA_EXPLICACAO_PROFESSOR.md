# 🎓 GUIA DE APRESENTAÇÃO TÉCNICA — ADOTEPET
**Manual de Explicação Técnica para a Banca / Professor**  
*Engenharia de Software — 2º Semestre*

---

## 🧭 Visão Geral da Arquitetura do Sistema

> **Frase de introdução para abrir a apresentação:**  
> *"Professor, o AdotePet foi projetado seguindo o padrão de **Arquitetura em Três Camadas (3-Tier)** desacoplada. Nós separamos estritamente a camada de **Apresentação (Front-End)**, a camada de **Regras de Negócio e API (Back-End)** e a camada de **Persistência de Dados (MySQL)**. A comunicação entre o navegador e o servidor é 100% local, trafegando mensagens assíncronas em formato JSON por meio do protocolo HTTP."*

---

# 1. PARTE 1: O FRONT-END (Interface, Estilização e Lógica do Cliente)

### 1.1. Estrutura e Papel no Sistema
O Front-End é a camada responsável pela experiência visual do usuário, validação inicial dos dados inseridos e exibição das informações vindas do banco de dados.

- **Arquivos que compõem o Front-End:**
  - `frontend/index.html`: Página inicial com banner institucional e cards com pets em destaque.
  - `frontend/animais.html`: Catálogo geral com barra de filtros e pesquisa em tempo real.
  - `frontend/detalhes.html`: Visualização detalhada do pet e identificação do tutor responsável.
  - `frontend/cadastrar-animal.html`: Formulário para cadastrar e editar animais.
  - `frontend/cadastro.html`: Formulário de criação de conta de usuário.
  - `frontend/login.html`: Formulário de autenticação.
  - `frontend/sobre.html`: Página institucional sobre o projeto e a equipe acadêmica.
  - `frontend/css/style.css`: Folha de estilos CSS3 centralizada.
  - `frontend/js/script.js`: Lógica de requisições e manipulação do DOM.

---

### 1.2. O que explicar sobre o HTML5 (Formulários e Semântica)

> **Como explicar para o professor:**  
> *"No Front-End, nós não utilizamos bibliotecas ou frameworks pesados como React ou Vue, conforme os requisitos do trabalho. Construímos as páginas com **HTML5 semântico puro**, utilizando tags estruturais como `<header>`, `<main>`, `<section>`, `<article>` e `<footer>`, o que garante acessibilidade e boas práticas de SEO."*

**Pontos técnicos dos formulários:**
1. **Validação Nativa de Entrada:**
   - Atributos `required` para impedir submissão com campos vazios.
   - Atributos `type="email"`, `type="password"`, `type="url"` para validação automática de padrões pelo próprio navegador.
   - Restrições de tamanho com `minlength="6"` no campo de senha para garantir senhas seguras.
2. **Seleções Intuitivas:**
   - Uso de tags `<select>` e `<option>` para campos categóricos finitos: Espécie (`cachorro` ou `gato`) e Porte (`pequeno`, `medio` ou `grande`), eliminando erros de digitação do usuário.
   - Uso de `<textarea>` para textos longos de descrição e histórico de resgate.

---

### 1.3. O que explicar sobre o CSS3 (Identidade Visual e Responsividade)

> **Como explicar para o professor:**  
> *"A estilização foi centralizada no arquivo `style.css` e implementa a identidade visual **Warm Shelter Minimal**, utilizando uma paleta de cores acolhedora baseada em verde claro botânico (`#52B788` e `#006C48`), fundo linho/bege (`#FAF8F5`) e cartões em branco puro (`#FFFFFF`)."*

**Conceitos técnicos de CSS3 utilizados:**
1. **Variáveis Customizadas (CSS Custom Properties):**
   - Definidas no bloco `:root`, permitindo reutilização e fácil manutenção de cores, raios de borda (`--radius-full`, `--radius-lg`) e sombras (`--shadow-md`).
2. **Layout Moderno (Flexbox e CSS Grid):**
   - **Flexbox:** Utilizado nos cabeçalhos, barras de navegação, botões e alinhamento interno dos cards.
   - **CSS Grid:** Utilizado na grade de exibição dos animais (`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`), permitindo que a quantidade de colunas se autoajuste à largura da tela.
3. **Responsividade com Media Queries:**
   - Regras `@media (max-width: 900px)` e `@media (max-width: 640px)` para rearranjar colunas duplas em telas de celulares e tablets, garantindo usabilidade em qualquer dispositivo.

---

### 1.4. O que explicar sobre o JavaScript do Cliente (`script.js`)

> **Como explicar para o professor:**  
> *"O arquivo `script.js` atua como o 'cérebro' do Front-End. Ele escuta os eventos da página, impede o recarregamento padrão dos formulários através do `event.preventDefault()` e consome a nossa API local utilizando a **Fetch API** assíncrona com `async/await`."*

**Recursos implementados:**
1. **Consumo de API REST via `fetch()`:**
   - Envio de verbos HTTP específicos (`GET`, `POST`, `PUT`, `DELETE`).
   - Configuração de cabeçalhos `headers: { 'Content-Type': 'application/json' }`.
   - Conversão dos dados do formulário para JSON com `JSON.stringify()`.
2. **Manipulação Dinâmica do DOM:**
   - Renderização reativa dos cartões de animais via método `.map()` e *template strings*.
   - Tratamento de estados vazios: se a busca não encontrar resultados, exibe mensagem amigável sem quebrar o layout.
3. **Gerenciamento de Sessão com `localStorage`:**
   - Ao fazer login, os dados do usuário (id e nome) são gravados no `localStorage` do navegador.
   - O menu de navegação se atualiza automaticamente: exibe saudação personalizada, o botão "+ Cadastrar Pet" e o botão "Sair".
4. **Sistema de Alertas (Toast Notifications):**
   - Notificações flutuantes que surgem na tela informando o sucesso ou o erro da requisição de forma moderna, sem travar o usuário com o antigo `alert()`.

---

# 2. PARTE 2: O BACK-END (Node.js, Express e API REST)

### 2.1. Estrutura e Papel no Sistema
O Back-End é a camada intermediária responsável por receber as requisições HTTP do navegador, validar as regras de negócio, criptografar senhas, interagir com o banco de dados MySQL e devolver uma resposta com o código de status HTTP apropriado.

- **Arquivos do Back-End:**
  - `backend/server.js`: Ponto de entrada da aplicação e servidor de arquivos estáticos.
  - `backend/database.js`: Módulo de conexão com o MySQL usando Pool.
  - `backend/routes/animais.js`: Controladores e rotas das 4 operações CRUD de animais.
  - `backend/routes/usuarios.js`: Controladores e rotas de autenticação e registro.
  - `.env`: Configuração das variáveis de ambiente locais.

---

### 2.2. O que explicar sobre o Servidor Express (`server.js`)

> **Como explicar para o professor:**  
> *"Nosso servidor foi construído em **Node.js** com o framework **Express**. Ele inicializa na porta local 3000 e utiliza middlewares fundamentais: `cors()` para habilitar requisições cruzadas com segurança, `express.json()` para ler requisições com corpo em JSON e `express.static()` para servir diretamente todos os arquivos HTML, CSS e JS da pasta `frontend/`."*

**Rotas Registradas no Servidor:**
- `/api/animais` ➔ Direcionado para o módulo `routes/animais.js`
- `/api/usuarios` ➔ Direcionado para o módulo `routes/usuarios.js`
- `/api/status` ➔ Rota de verificação de integridade da API (*Healthcheck*)

---

### 2.3. O que explicar sobre a Implementação das 4 Operações CRUD

> **Como explicar para o professor:**  
> *"Nós implementamos o CRUD completo de animais no arquivo `routes/animais.js` respeitando os princípios da arquitetura **RESTful**, onde cada operação corresponde a um método HTTP padronizado:"*

1. **CREATE (Inclusão de Registro) — `POST /api/animais`**
   - Recebe nome, espécie, idade, porte, descrição, foto e o id do tutor.
   - Valida se os campos obrigatórios foram preenchidos.
   - Executa a inserção com consulta preparada e retorna o código **`201 Created`** contendo o ID gerado pelo banco.

2. **READ (Consulta de Registros) — `GET /api/animais` e `GET /api/animais/:id`**
   - A rota de listagem suporta parâmetros de consulta (*query parameters*) para filtrar por espécie, porte ou busca por nome.
   - Faz um `INNER JOIN` com a tabela `usuarios` para trazer o nome e contato do tutor responsável.
   - Retorna código **`200 OK`** com a contagem total e o array de animais encontrados.
   - A rota por ID consulta os detalhes de um único animal específico.

3. **UPDATE (Alteração de Registro) — `PUT /api/animais/:id`**
   - Recebe o ID do animal via parâmetro de rota (`req.params.id`) e os novos dados no corpo da requisição.
   - Primeiro verifica se o animal existe no MySQL.
   - Executa o comando SQL `UPDATE` de forma parametrizada e retorna **`200 OK`**.

4. **DELETE (Exclusão de Registro) — `DELETE /api/animais/:id`**
   - Recebe o ID do animal a ser excluído.
   - Localiza o registro e executa a exclusão definitiva com o comando SQL `DELETE FROM animais WHERE id = ?`.
   - Retorna **`200 OK`** com mensagem amigável confirmando a exclusão.

---

### 2.4. O que explicar sobre Segurança no Back-End

> **Como explicar para o professor:**  
> *"Aplicamos dois conceitos essenciais de segurança da informação no backend:*
> 1. *Proteção de senhas com **Bcrypt**: A senha nunca é gravada em texto plano. Ao cadastrar, utilizamos o `bcrypt.hash()` com 10 rounds de salt. No login, comparamos com `bcrypt.compare()`. Mesmo que alguém tenha acesso ao banco, é impossível descobrir a senha original.*
> 2. *Isolamento de credenciais com **Dotenv**: Nenhuma senha de banco está gravada no código. Todas são lidas dinamicamente do arquivo local `.env`."*

---

# 3. PARTE 3: O BANCO DE DADOS (MySQL, DDL e Consultas)

### 3.1. Estrutura e Papel no Sistema
O banco de dados é a camada de persistência. Ele garante que os dados dos animais e usuários permaneçam salvos com integridade e segurança, mesmo se o servidor for desligado.

- **Arquivo:** `database/adotepet.sql`
- **SGBD:** MySQL (gerenciado pelo MySQL Workbench)
- **Driver de Conexão:** `mysql2/promise` com Pool de Conexões

---

### 3.2. O que explicar sobre o Script SQL/DDL (`adotepet.sql`)

> **Como explicar para o professor:**  
> *"Criamos o banco de dados `adotepet` com codificação `utf8mb4` para aceitar acentuação em português e emojis. A modelagem é composta por duas entidades relacionais: `usuarios` e `animais`, relacionadas na cardinalidade **1 para N** (um usuário pode cadastrar vários animais)."*

**Estrutura das Tabelas:**
1. **Tabela `usuarios`:**
   - `id`: Chave primária (`INT AUTO_INCREMENT PRIMARY KEY`).
   - `nome`: `VARCHAR(100)` não nulo.
   - `email`: `VARCHAR(100)` não nulo com restrição `UNIQUE` (impede dois cadastros com o mesmo e-mail).
   - `senha`: `VARCHAR(255)` não nulo para armazenar o hash de 60 caracteres gerado pelo bcrypt.
   - `criado_em`: `TIMESTAMP DEFAULT CURRENT_TIMESTAMP`.

2. **Tabela `animais`:**
   - `id`: Chave primária (`INT AUTO_INCREMENT PRIMARY KEY`).
   - `nome`, `especie`, `idade`, `porte`: Campos textuais tipados com limites de tamanho adequados.
   - `descricao`: Tipo `TEXT` para histórico detalhado.
   - `foto`: Tipo `TEXT` para link da imagem.
   - `usuario_id`: **Chave Estrangeira (Foreign Key)** referenciando `usuarios(id)`.
   - **Regra de Integridade Referencial:** Configurada com `ON DELETE CASCADE` e `ON UPDATE CASCADE`. Isso significa que se um usuário for deletado, todos os animais cadastrados por ele são removidos automaticamente, mantendo a consistência do banco de dados sem deixar registros órfãos.

---

### 3.3. O que explicar sobre a Prevenção contra SQL Injection

> **Como explicar para o professor:**  
> *"Um dos requisitos mais importantes do professor foi evitar vulnerabilidades de **SQL Injection**. No nosso código, nunca utilizamos concatenação de variáveis dentro da string SQL como `WHERE nome = ' " + nome + " '`. Em vez disso, usamos **Consultas Preparadas (Prepared Statements)** com o ponto de interrogação `?` como marcador de posição:*
>
> ```javascript
> const sql = 'INSERT INTO animais (nome, especie, idade, porte, descricao, foto, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
> await pool.query(sql, [nome, especie, idade, porte, descricao, foto, usuario_id]);
> ```
> *O próprio driver `mysql2` sanitiza e escapa os dados antes de enviá-los ao motor do banco, garantindo que nenhum comando malicioso possa ser injetado."*

---

### 3.4. O que explicar sobre o Pool de Conexões (`database.js`)

> **Como explicar para o professor:**  
> *"Em vez de abrir e fechar uma conexão física para cada clique do usuário — o que sobrecarregaria o MySQL e causaria lentidão —, utilizamos um **Connection Pool** (`mysql.createPool`). O pool mantém uma lista de conexões pré-abertas na memória e as reutiliza de forma transparente e eficiente."*

---

# 4. ROTEIRO PRÁTICO PARA A DEMONSTRAÇÃO AO VIVO (5 Minutos)

Quando o professor disser: *"Pode rodar o sistema e me mostrar funcionando"*, siga exatamente estes passos:

1. **Passo 1: Mostrar o Servidor Ligando no Terminal**
   - Abra o terminal na pasta do projeto e digite:
     ```bash
     npm start
     ```
   - Aponte para o terminal e mostre:
     - `✅ [MySQL] Conexão com o banco de dados "adotepet" estabelecida com sucesso!`
     - `🚀 Servidor rodando em: http://localhost:3000`

2. **Passo 2: Abrir no Navegador e Mostrar a Página Inicial**
   - Acesse `http://localhost:3000`
   - Destaque o design responsivo, a paleta de cores verde/bege e os animais já carregados dinamicamente do banco de dados.

3. **Passo 3: Demonstração da Operação READ e Filtros**
   - Clique em **Animais** no menu superior.
   - Clique no botão **Cachorros** e depois em **Gatos**.
   - Digite no campo de busca o nome de um animal (ex: "Pipoca").
   - Explique: *"Professor, a cada filtro o Front-End faz um `fetch()` com query parameters para o endpoint `GET /api/animais`, e o backend filtra no MySQL com `WHERE`."*

4. **Passo 4: Login e Demonstração da Operação CREATE**
   - Clique em **Entrar** e use a conta de teste:
     - E-mail: `admin@adotepet.com`
     - Senha: `12345678`
   - Observe que o menu superior agora mostra o nome do usuário e o botão **+ Cadastrar Pet**.
   - Preencha o formulário com um novo animal (ex: "Caramelo", Cachorro, Porte Médio, 2 anos) e envie.
   - Mostre a notificação de sucesso e o pet já aparecendo na listagem.

5. **Passo 5: Demonstração da Operação UPDATE**
   - Clique no pet que você acabou de cadastrar para ver a página de detalhes.
   - Clique no botão **✏️ Editar Informações**.
   - Mude o nome ou a idade e clique em salvar.
   - Mostre que a alteração foi salva com o método `PUT`.

6. **Passo 6: Demonstração da Operação DELETE**
   - Na página de detalhes do mesmo animal, clique no botão vermelho **🗑️ Excluir Registro**.
   - Confirme no alerta do navegador.
   - Mostre que o animal sumiu da listagem e que a exclusão foi confirmada pelo backend com o método `DELETE`.

7. **Passo 7: Mostrar os Dados no MySQL Workbench**
   - Alterne a tela para o MySQL Workbench e execute:
     ```sql
     SELECT * FROM animais;
     ```
   - Mostre para o professor os dados gravados no banco real.
