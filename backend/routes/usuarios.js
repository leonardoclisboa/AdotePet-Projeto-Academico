// ========================================================
// PROJETO ACADÊMICO: AdotePet
// Arquivo: backend/routes/usuarios.js
// Função: Rotas e regras de negócio para Usuários (Cadastro e Login)
// ========================================================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../database');

/**
 * ROTA: POST /api/usuarios/cadastro
 * DESCRIÇÃO: Cadastra um novo usuário no sistema
 */
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, confirmacaoSenha } = req.body;

    // 1. Validação dos campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Por favor, preencha todos os campos obrigatórios.'
      });
    }

    // 2. Validação da confirmação de senha
    if (confirmacaoSenha && senha !== confirmacaoSenha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A confirmação de senha não confere com a senha informada.'
      });
    }

    // 3. Validação do tamanho mínimo de senha
    if (senha.length < 6) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'A senha deve conter no mínimo 6 caracteres.'
      });
    }

    // 4. Verificação se o e-mail já está cadastrado (usando Consulta Preparada)
    const [existente] = await pool.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (existente.length > 0) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Este e-mail já está em uso por outro usuário.'
      });
    }

    // 5. Criptografia da senha utilizando hash seguro (bcrypt)
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // 6. Inserção do usuário no banco de dados com Consulta Preparada
    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome.trim(), email.toLowerCase().trim(), senhaHash]
    );

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Usuário cadastrado com sucesso!',
      usuario: {
        id: resultado.insertId,
        nome: nome.trim(),
        email: email.toLowerCase().trim()
      }
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao tentar cadastrar o usuário.'
    });
  }
});

/**
 * ROTA: POST /api/usuarios/login
 * DESCRIÇÃO: Autentica o usuário validando e-mail e hash da senha
 */
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Por favor, informe seu e-mail e senha.'
      });
    }

    // 1. Busca usuário pelo e-mail
    const [usuarios] = await pool.query(
      'SELECT id, nome, email, senha FROM usuarios WHERE email = ?',
      [email.toLowerCase().trim()]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'E-mail ou senha incorretos.'
      });
    }

    const usuario = usuarios[0];

    // 2. Compara a senha informada com o hash armazenado
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        sucesso: false,
        mensagem: 'E-mail ou senha incorretos.'
      });
    }

    // 3. Login com sucesso - retorna os dados do usuário (sem a senha)
    return res.status(200).json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno no servidor ao tentar realizar o login.'
    });
  }
});

/**
 * ROTA: GET /api/usuarios/:id
 * DESCRIÇÃO: Retorna os dados públicos de um usuário
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [usuarios] = await pool.query(
      'SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?',
      [id]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Usuário não encontrado.'
      });
    }

    return res.status(200).json({
      sucesso: true,
      usuario: usuarios[0]
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao consultar usuário.'
    });
  }
});

module.exports = router;
