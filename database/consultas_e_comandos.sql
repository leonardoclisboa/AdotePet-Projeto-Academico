-- ========================================================
-- PROJETO ACADÊMICO: AdotePet
-- Disciplina: Engenharia de Software - 2º Semestre
-- Arquivo: database/consultas_e_comandos.sql
-- Objetivo: Comandos prontos para executar no MySQL Workbench
-- ========================================================

-- --------------------------------------------------------
-- 1. SELEÇÃO DO BANCO E INSPEÇÃO DE ESTRUTURA
-- --------------------------------------------------------

-- Seleciona o banco de dados do projeto
USE `adotepet`;

-- Lista todas as tabelas do banco
SHOW TABLES;

-- Exibe as colunas, tipos e chaves da tabela usuarios
DESCRIBE `usuarios`;

-- Exibe as colunas, tipos e chaves da tabela animais
DESCRIBE `animais`;


-- --------------------------------------------------------
-- 2. CONSULTAS BÁSICAS (READ GERAL)
-- --------------------------------------------------------

-- Listar todos os usuários cadastrados
SELECT * FROM `usuarios`;

-- Listar todos os animais cadastrados
SELECT * FROM `animais`;

-- Listar animais ordenados do mais recente para o mais antigo
SELECT id, nome, especie, idade, porte, criado_em 
FROM `animais` 
ORDER BY id DESC;


-- --------------------------------------------------------
-- 3. CONSULTAS COM FILTROS (WHERE)
-- --------------------------------------------------------

-- Consultar apenas os cachorros
SELECT * FROM `animais` 
WHERE especie = 'cachorro';

-- Consultar apenas os gatos
SELECT * FROM `animais` 
WHERE especie = 'gato';

-- Consultar animais de porte pequeno
SELECT * FROM `animais` 
WHERE porte = 'pequeno';

-- Filtro combinado: cachorros de porte grande
SELECT * FROM `animais` 
WHERE especie = 'cachorro' AND porte = 'grande';

-- Busca textual por parte do nome (operador LIKE)
SELECT * FROM `animais` 
WHERE nome LIKE '%Pipoca%';


-- --------------------------------------------------------
-- 4. CONSULTA RELACIONAL COM JUNÇÃO (INNER JOIN)
-- (Mostra os dados do animal e o nome/e-mail do dono responsável)
-- --------------------------------------------------------

SELECT 
    a.id AS id_animal,
    a.nome AS nome_animal,
    a.especie,
    a.idade,
    a.porte,
    a.descricao,
    u.id AS id_tutor,
    u.nome AS tutor_responsavel,
    u.email AS contato_tutor
FROM `animais` a
INNER JOIN `usuarios` u ON a.usuario_id = u.id
ORDER BY a.id DESC;


-- --------------------------------------------------------
-- 5. CONSULTAS DE CONTAGEM E ESTATÍSTICAS (COUNT & GROUP BY)
-- --------------------------------------------------------

-- Total de animais cadastrados na plataforma
SELECT COUNT(*) AS total_animais FROM `animais`;

-- Total de cães e gatos cadastrados (agrupamento por espécie)
SELECT especie, COUNT(*) AS quantidade 
FROM `animais` 
GROUP BY especie;

-- Total de animais por porte (pequeno, médio ou grande)
SELECT porte, COUNT(*) AS quantidade 
FROM `animais` 
GROUP BY porte;

-- Quantos animais cada usuário cadastrou
SELECT 
    u.nome AS usuario, 
    COUNT(a.id) AS total_animais_cadastrados
FROM `usuarios` u
LEFT JOIN `animais` a ON u.id = a.usuario_id
GROUP BY u.id, u.nome;


-- --------------------------------------------------------
-- 6. TESTES DAS 4 OPERAÇÕES DO CRUD NO BANCO
-- --------------------------------------------------------

-- [CREATE] Inserir um novo animal manualmente no banco
INSERT INTO `animais` (nome, especie, idade, porte, descricao, foto, usuario_id) 
VALUES (
    'Caramelo', 
    'cachorro', 
    '2 anos', 
    'medio', 
    'Muito brincalhão, adora passear e convive bem com crianças.', 
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80', 
    1
);

-- [READ] Consultar o animal que acabou de ser inserido
SELECT * FROM `animais` WHERE nome = 'Caramelo';

-- [UPDATE] Alterar a idade e o porte do animal cadastrado
UPDATE `animais` 
SET idade = '3 anos', porte = 'grande' 
WHERE nome = 'Caramelo';

-- [DELETE] Excluir o animal de teste cadastrado
DELETE FROM `animais` 
WHERE nome = 'Caramelo';


-- --------------------------------------------------------
-- 7. COMANDOS DE MANUTENÇÃO E LIMPEZA
-- --------------------------------------------------------

-- ATENÇÃO: Os comandos abaixo apagam dados de teste.
-- Use apenas se precisar reiniciar o banco!

-- Apaga apenas os animais cadastrados
-- DELETE FROM `animais`;

-- Reinicia a contagem do auto_increment de animais para 1
-- ALTER TABLE `animais` AUTO_INCREMENT = 1;
