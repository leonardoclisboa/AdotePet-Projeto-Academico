// backend/routes/usuarios.js
// Cadastro e login simples de usuários (sem criptografia de senha)

const express = require('express');
const router = express.Router();
const pool = require('../database');

// 1. Cadastrar Usuário
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Preencha todos os campos!' });
    }

    // Salva a senha diretamente no banco de dados
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    const [resultado] = await pool.query(sql, [nome, email, senha]);

    res.status(201).json({ 
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: { id: resultado.insertId, nome, email }
    });
  } catch (erro) {
    console.error('Erro no cadastro:', erro);
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário no banco.' });
  }
});

// 2. Fazer Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca o usuário comparando e-mail e senha diretamente
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    const [usuarios] = await pool.query(sql, [email, senha]);

    if (usuarios.length === 0) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos!' });
    }

    const usuario = usuarios[0];

    res.json({
      mensagem: 'Login realizado com sucesso!',
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    });
  } catch (erro) {
    console.error('Erro no login:', erro);
    res.status(500).json({ mensagem: 'Erro ao realizar login.' });
  }
});

module.exports = router;
