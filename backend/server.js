// ========================================================
// PROJETO ACADÊMICO: AdotePet
// Arquivo: backend/server.js
// Função: Servidor principal Express, rotas da API e servidor de arquivos estáticos
// ========================================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares essenciais
app.use(cors()); // Habilita CORS para requisições de outros orígens se necessário
app.use(express.json()); // Permite receber e processar JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Permite receber dados de formulários tradicionais

// Servir os arquivos estáticos do Front-End (HTML, CSS, JS, Imagens)
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas da API REST
const rotasAnimais = require('./routes/animais');
const rotasUsuarios = require('./routes/usuarios');

app.use('/api/animais', rotasAnimais);
app.use('/api/usuarios', rotasUsuarios);

// Rota de verificação do status da API (Healthcheck acadêmico)
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'online',
    projeto: 'AdotePet',
    versao: '1.0.0',
    semestre: '2º Semestre - Engenharia de Software',
    timestamp: new Date().toISOString()
  });
});

// Redirecionamento da raiz para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Middleware de tratamento de rotas não encontradas (404)
app.use((req, res, next) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, '../frontend/index.html'));
  } else {
    res.status(404).json({ sucesso: false, mensagem: 'Rota não encontrada.' });
  }
});

// Inicia o servidor HTTP
app.listen(PORT, () => {
  console.log('========================================================');
  console.log(`🐾 Sistema AdotePet em Execução!`);
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📂 Frontend servido a partir da pasta: frontend/`);
  console.log(`🛠️ API disponível em: http://localhost:${PORT}/api/animais`);
  console.log('========================================================');
});
