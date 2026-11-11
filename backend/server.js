// backend/server.js
// Servidor principal do projeto AdotePet

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações básicas
app.use(cors());
app.use(express.json());

// Serve os arquivos do Front-End (HTML, CSS e JS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas da API
const rotasAnimais = require('./routes/animais');
const rotasUsuarios = require('./routes/usuarios');

app.use('/api/animais', rotasAnimais);
app.use('/api/usuarios', rotasUsuarios);

// Rota inicial: abre o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🐾 Servidor rodando em: http://localhost:${PORT}`);
});
