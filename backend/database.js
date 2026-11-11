// ========================================================
// PROJETO ACADÊMICO: AdotePet
// Arquivo: backend/database.js
// Função: Gerenciar o pool de conexões com o MySQL utilizando mysql2
// ========================================================

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria um pool de conexões para otimizar desempenho e gerenciar conexões concorrentes
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'adotepet',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função auxiliar para testar e validar a conexão com o banco de dados no boot da aplicação
async function testarConexao() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ [MySQL] Conexão com o banco de dados "adotepet" estabelecida com sucesso!');
    connection.release();
  } catch (error) {
    console.error('❌ [MySQL] Erro ao conectar com o banco de dados:', error.message);
    console.error('👉 Verifique se o MySQL está rodando e se o arquivo .env possui as credenciais corretas.');
  }
}

// Executa o teste de conexão
testarConexao();

module.exports = pool;
