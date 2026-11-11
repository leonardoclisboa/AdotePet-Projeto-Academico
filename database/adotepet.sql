-- ========================================================
-- PROJETO ACADÊMICO: AdotePet
-- Disciplina: Engenharia de Software - 2º Semestre
-- Script SQL DDL: Criação do Banco de Dados e Tabelas
-- Compatibilidade: MySQL 5.7+ / MySQL 8.0+ / MySQL Workbench
-- ========================================================

-- 1. Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS `adotepet` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `adotepet`;

-- 2. Remoção de tabelas antigas para recriação limpa (ordem inversa de dependência)
DROP TABLE IF EXISTS `animais`;
DROP TABLE IF EXISTS `usuarios`;

-- 3. Criação da Tabela: usuarios
CREATE TABLE `usuarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL COMMENT 'Nome completo do usuário cadastrado',
  `email` VARCHAR(100) NOT NULL UNIQUE COMMENT 'E-mail de acesso e contato (único)',
  `senha` VARCHAR(255) NOT NULL COMMENT 'Senha criptografada com algoritmo de hash seguro (bcrypt)',
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora do registro'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Criação da Tabela: animais
CREATE TABLE `animais` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL COMMENT 'Nome do animal para adoção',
  `especie` VARCHAR(20) NOT NULL COMMENT 'Espécie do animal: cachorro ou gato',
  `idade` VARCHAR(50) NOT NULL COMMENT 'Idade aproximada (ex: 2 meses, 1 ano, adulto)',
  `porte` VARCHAR(20) NOT NULL COMMENT 'Porte do animal: pequeno, medio ou grande',
  `descricao` TEXT NOT NULL COMMENT 'Histórico, temperamento e cuidados necessários',
  `foto` TEXT NOT NULL COMMENT 'URL ou caminho da imagem do animal',
  `usuario_id` INT NOT NULL COMMENT 'ID do usuário responsável pelo cadastro',
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora da publicação',
  CONSTRAINT `fk_animais_usuarios` 
    FOREIGN KEY (`usuario_id`) 
    REFERENCES `usuarios` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Inserção de Dados Iniciais de Teste (Seed acadêmico)
-- Senha padrão para o usuário de teste: '12345678' (armazenada com hash bcrypt)
INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`) VALUES 
(1, 'Administrador AdotePet', 'admin@adotepet.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW');

-- Animais cadastrados vinculados ao usuário de ID 1
INSERT INTO `animais` (`id`, `nome`, `especie`, `idade`, `porte`, `descricao`, `foto`, `usuario_id`) VALUES
(1, 'Pipoca', 'cachorro', '1 ano', 'pequeno', 'Pipoca é um cachorrinho dócil, brincalhão e cheio de energia. Adora correr no gramado, convive muito bem com outros animais e crianças. Já está castrado e vacinado.', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80', 1),
(2, 'Luna', 'gato', '8 meses', 'pequeno', 'Luna é uma gatinha calma, carinhosa e muito observadora. Gosta de aconchego, sachê e de dormir no solzinho da tarde. Vermifugada e castrada.', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80', 1),
(3, 'Thor', 'cachorro', '2 anos', 'grande', 'Thor é um grandalhão muito carinhoso e protetor. Precisa de espaço para gastar energia e de uma família com quintal. Muito inteligente e obediente.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80', 1),
(4, 'Mimi', 'gato', '1 ano e meio', 'pequeno', 'Mimi é brincalhona, curiosa e muito sociável com outros gatos. Já é acostumada com apartamento com telas de proteção.', 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80', 1),
(5, 'Bob', 'cachorro', '3 anos', 'medio', 'Bob é um companheiro fiel, adora passeios na coleira e é muito calmo em casa. Ideal para quem procura um parceiro leal e tranquilo.', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80', 1),
(6, 'Frajola', 'gato', '2 anos', 'medio', 'Frajola é carinhoso, ronrona bastante quando recebe cafuné e gosta de brincar com bolinhas de papel. Saudável e vacinado.', 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80', 1);
