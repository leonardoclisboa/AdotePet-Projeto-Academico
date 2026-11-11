// ========================================================
// PROJETO ACADÊMICO: AdotePet
// Arquivo: backend/routes/animais.js
// Função: Implementação das 4 operações CRUD para os Animais
// ========================================================

const express = require('express');
const router = express.Router();
const pool = require('../database');

/**
 * ----------------------------------------------------
 * OPERAÇÃO 1: CREATE (Inclusão de registros)
 * ROTA: POST /api/animais
 * ----------------------------------------------------
 */
router.post('/', async (req, res) => {
  try {
    const { nome, especie, idade, porte, descricao, foto, usuario_id } = req.body;

    // 1. Validação de dados de entrada
    if (!nome || !especie || !idade || !porte || !descricao) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Preencha todos os campos obrigatórios do animal.'
      });
    }

    // Foto padrão caso o usuário não informe uma URL
    const fotoFinal = foto && foto.trim() !== ''
      ? foto.trim()
      : (especie.toLowerCase() === 'gato'
          ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80');

    // Validação de usuario_id (se não enviado, atribui o usuário administrador padrão id: 1)
    const idUsuario = usuario_id ? Number(usuario_id) : 1;

    // 2. Consulta Preparada para prevenir SQL Injection
    const sql = `
      INSERT INTO animais (nome, especie, idade, porte, descricao, foto, usuario_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [resultado] = await pool.query(sql, [
      nome.trim(),
      especie.toLowerCase().trim(),
      idade.trim(),
      porte.toLowerCase().trim(),
      descricao.trim(),
      fotoFinal,
      idUsuario
    ]);

    return res.status(201).json({
      sucesso: true,
      mensagem: 'Animal cadastrado com sucesso!',
      id: resultado.insertId
    });
  } catch (error) {
    console.error('Erro ao cadastrar animal (CREATE):', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao salvar animal no banco de dados.'
    });
  }
});

/**
 * ----------------------------------------------------
 * OPERAÇÃO 2: READ (Consulta de registros)
 * ROTA: GET /api/animais (Listagem com filtros opcionais)
 * ----------------------------------------------------
 */
router.get('/', async (req, res) => {
  try {
    const { especie, porte, busca, limit } = req.query;

    let sql = `
      SELECT 
        a.id, 
        a.nome, 
        a.especie, 
        a.idade, 
        a.porte, 
        a.descricao, 
        a.foto, 
        a.usuario_id, 
        a.criado_em,
        u.nome AS responsavel_nome,
        u.email AS responsavel_email
      FROM animais a
      INNER JOIN usuarios u ON a.usuario_id = u.id
      WHERE 1=1
    `;

    const parametros = [];

    // Filtro por espécie (cachorro, gato)
    if (especie && especie.toLowerCase() !== 'all' && especie.toLowerCase() !== 'todos') {
      sql += ' AND a.especie = ?';
      parametros.push(especie.toLowerCase().trim());
    }

    // Filtro por porte (pequeno, medio, grande)
    if (porte && porte.toLowerCase() !== 'all' && porte.toLowerCase() !== 'todos') {
      sql += ' AND a.porte = ?';
      parametros.push(porte.toLowerCase().trim());
    }

    // Filtro por busca textual (nome ou descrição)
    if (busca && busca.trim() !== '') {
      sql += ' AND (a.nome LIKE ? OR a.descricao LIKE ?)';
      parametros.push(`%${busca.trim()}%`, `%${busca.trim()}%`);
    }

    // Ordenação do mais recente para o mais antigo
    sql += ' ORDER BY a.id DESC';

    // Limite opcional (para a página inicial, ex: limit=4 ou 6)
    if (limit && !isNaN(Number(limit))) {
      sql += ` LIMIT ${Number(limit)}`;
    }

    const [animais] = await pool.query(sql, parametros);

    return res.status(200).json({
      sucesso: true,
      total: animais.length,
      dados: animais
    });
  } catch (error) {
    console.error('Erro ao listar animais (READ):', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao consultar lista de animais.'
    });
  }
});

/**
 * ----------------------------------------------------
 * OPERAÇÃO 2 (Continuação): READ de um único registro por ID
 * ROTA: GET /api/animais/:id
 * ----------------------------------------------------
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT 
        a.id, 
        a.nome, 
        a.especie, 
        a.idade, 
        a.porte, 
        a.descricao, 
        a.foto, 
        a.usuario_id, 
        a.criado_em,
        u.nome AS responsavel_nome,
        u.email AS responsavel_email
      FROM animais a
      INNER JOIN usuarios u ON a.usuario_id = u.id
      WHERE a.id = ?
    `;

    const [animais] = await pool.query(sql, [id]);

    if (animais.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Animal não encontrado.'
      });
    }

    return res.status(200).json({
      sucesso: true,
      animal: animais[0]
    });
  } catch (error) {
    console.error('Erro ao consultar detalhes do animal (READ):', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao buscar detalhes do animal.'
    });
  }
});

/**
 * ----------------------------------------------------
 * OPERAÇÃO 3: UPDATE (Alteração de registros)
 * ROTA: PUT /api/animais/:id
 * ----------------------------------------------------
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, idade, porte, descricao, foto } = req.body;

    // 1. Verifica se o animal existe
    const [existente] = await pool.query('SELECT * FROM animais WHERE id = ?', [id]);
    if (existente.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Animal não encontrado para alteração.'
      });
    }

    const animalAtual = existente[0];

    // 2. Prepara novos dados mantendo os atuais caso algum campo não seja reenviado
    const novoNome = nome ? nome.trim() : animalAtual.nome;
    const novaEspecie = especie ? especie.toLowerCase().trim() : animalAtual.especie;
    const novaIdade = idade ? idade.trim() : animalAtual.idade;
    const novoPorte = porte ? porte.toLowerCase().trim() : animalAtual.porte;
    const novaDescricao = descricao ? descricao.trim() : animalAtual.descricao;
    const novaFoto = foto && foto.trim() !== '' ? foto.trim() : animalAtual.foto;

    // 3. Executa a atualização com Consulta Preparada
    const sql = `
      UPDATE animais 
      SET nome = ?, especie = ?, idade = ?, porte = ?, descricao = ?, foto = ?
      WHERE id = ?
    `;

    await pool.query(sql, [
      novoNome,
      novaEspecie,
      novaIdade,
      novoPorte,
      novaDescricao,
      novaFoto,
      id
    ]);

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Dados do animal atualizados com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao atualizar animal (UPDATE):', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar informações do animal.'
    });
  }
});

/**
 * ----------------------------------------------------
 * OPERAÇÃO 4: DELETE (Exclusão de registros)
 * ROTA: DELETE /api/animais/:id
 * ----------------------------------------------------
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Verifica se o registro existe antes de tentar deletar
    const [existente] = await pool.query('SELECT id, nome FROM animais WHERE id = ?', [id]);
    if (existente.length === 0) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Animal não encontrado para exclusão.'
      });
    }

    // 2. Executa a exclusão com Consulta Preparada
    await pool.query('DELETE FROM animais WHERE id = ?', [id]);

    return res.status(200).json({
      sucesso: true,
      mensagem: `Registro de "${existente[0].nome}" excluído com sucesso!`
    });
  } catch (error) {
    console.error('Erro ao excluir animal (DELETE):', error);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao excluir o animal do banco de dados.'
    });
  }
});

module.exports = router;
