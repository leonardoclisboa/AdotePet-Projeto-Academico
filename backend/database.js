// backend/database.js
// Conexão simples com o banco de dados MySQL usando mysql2

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Carrega as variáveis do arquivo .env
dotenv.config();

// Cria a conexão com o banco de dados adotepet
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'adotepet',
  port: process.env.DB_PORT || 3306
});

console.log(' Conectado ao MySQL com sucesso!');

module.exports = pool;
