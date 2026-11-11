// backend/routes/animais.js
// As 4 operações do CRUD de animais (Create, Read, Update, Delete) com proteção de dono

const express = require('express');
const router = express.Router();
const pool = require('../database');

// 1. CREATE: Cadastrar um novo animal
router.post('/', async (req, res) => {
  try {
    const { nome, especie, idade, porte, descricao, foto, usuario_id } = req.body;

    if (!usuario_id) {
      return res.status(401).json({ mensagem: 'Você precisa estar logado para cadastrar um animal!' });
    }

    const sql = `
      INSERT INTO animais (nome, especie, idade, porte, descricao, foto, usuario_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const fotoFinal = foto || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';

    const [resultado] = await pool.query(sql, [
      nome, especie, idade, porte, descricao, fotoFinal, usuario_id
    ]);

    res.status(201).json({ mensagem: 'Animal cadastrado com sucesso!', id: resultado.insertId });
  } catch (erro) {
    console.error('Erro ao cadastrar animal:', erro);
    res.status(500).json({ mensagem: 'Erro ao cadastrar animal no banco de dados.' });
  }
});

// 2. READ: Consultar todos os animais
router.get('/', async (req, res) => {
  try {
    const [animais] = await pool.query('SELECT * FROM animais ORDER BY id DESC');
    res.json(animais);
  } catch (erro) {
    console.error('Erro ao consultar animais:', erro);
    res.status(500).json({ mensagem: 'Erro ao consultar lista de animais.' });
  }
});

// 2. READ: Consultar um animal pelo ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [animais] = await pool.query('SELECT * FROM animais WHERE id = ?', [id]);

    if (animais.length === 0) {
      return res.status(404).json({ mensagem: 'Animal não encontrado.' });
    }

    res.json(animais[0]);
  } catch (erro) {
    console.error('Erro ao buscar animal por ID:', erro);
    res.status(500).json({ mensagem: 'Erro ao buscar animal.' });
  }
});

// 3. UPDATE: Alterar dados de um animal (apenas o dono pode alterar)
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, especie, idade, porte, descricao, foto, usuario_id } = req.body;

    // Busca o animal para verificar quem cadastrou
    const [animais] = await pool.query('SELECT * FROM animais WHERE id = ?', [id]);
    if (animais.length === 0) {
      return res.status(404).json({ mensagem: 'Animal não encontrado.' });
    }

    // Trava de segurança: apenas quem cadastrou pode alterar
    if (usuario_id && animais[0].usuario_id != usuario_id) {
      return res.status(403).json({ mensagem: 'Você só pode editar animais cadastrados por você!' });
    }

    const sql = `
      UPDATE animais 
      SET nome = ?, especie = ?, idade = ?, porte = ?, descricao = ?, foto = ?
      WHERE id = ?
    `;

    await pool.query(sql, [nome, especie, idade, porte, descricao, foto, id]);

    res.json({ mensagem: 'Animal alterado com sucesso!' });
  } catch (erro) {
    console.error('Erro ao alterar animal:', erro);
    res.status(500).json({ mensagem: 'Erro ao atualizar dados do animal.' });
  }
});

// 4. DELETE: Excluir um animal (apenas o dono pode excluir)
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario_id = req.query.usuario_id; // Recebe o id do usuário que pediu a exclusão

    // Busca o animal para conferir quem cadastrou
    const [animais] = await pool.query('SELECT * FROM animais WHERE id = ?', [id]);
    if (animais.length === 0) {
      return res.status(404).json({ mensagem: 'Animal não encontrado.' });
    }

    // Trava de segurança: apenas quem cadastrou pode excluir
    if (usuario_id && animais[0].usuario_id != usuario_id) {
      return res.status(403).json({ mensagem: 'Você só pode excluir animais cadastrados por você!' });
    }

    await pool.query('DELETE FROM animais WHERE id = ?', [id]);

    res.json({ mensagem: 'Animal excluído com sucesso!' });
  } catch (erro) {
    console.error('Erro ao excluir animal:', erro);
    res.status(500).json({ mensagem: 'Erro ao excluir animal.' });
  }
});

module.exports = router;
