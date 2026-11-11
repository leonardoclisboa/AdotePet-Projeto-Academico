-- ========================================================
-- PROJETO ACADÊMICO: AdotePet
-- Disciplina: Engenharia de Software - 2º Semestre
-- Script SQL DDL: Criação do Banco de Dados e Tabelas
-- ========================================================

-- 1. Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS `adotepet` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `adotepet`;

-- 2. Limpeza de tabelas antigas (se existirem)
DROP TABLE IF EXISTS `animais`;
DROP TABLE IF EXISTS `usuarios`;

-- 3. Tabela de Usuários (senha direta sem criptografia)
CREATE TABLE `usuarios` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `senha` VARCHAR(100) NOT NULL,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabela de Animais
CREATE TABLE `animais` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL,
  `especie` VARCHAR(20) NOT NULL,
  `idade` VARCHAR(50) NOT NULL,
  `porte` VARCHAR(20) NOT NULL,
  `descricao` TEXT NOT NULL,
  `foto` TEXT NOT NULL,
  `usuario_id` INT NOT NULL,
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_animais_usuarios` 
    FOREIGN KEY (`usuario_id`) 
    REFERENCES `usuarios` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Inserção do Usuário Inicial de Teste (Senha: 12345678)
INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`) VALUES 
(1, 'Administrador AdotePet', 'admin@adotepet.com', '12345678');

-- 6. Inserção de Animais Iniciais
INSERT INTO `animais` (`id`, `nome`, `especie`, `idade`, `porte`, `descricao`, `foto`, `usuario_id`) VALUES
(1, 'Pipoca', 'cachorro', '1 ano', 'pequeno', 'Pipoca é um cachorrinho dócil, brincalhão e cheio de energia. Já está castrado e vacinado.', 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80', 1),
(2, 'Luna', 'gato', '8 meses', 'pequeno', 'Luna é uma gatinha calma, carinhosa e muito observadora. Gosta de aconchego e sachê.', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80', 1),
(3, 'Thor', 'cachorro', '2 anos', 'grande', 'Thor é um grandalhão muito carinhoso e protetor. Precisa de espaço para gastar energia.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80', 1),
(4, 'Mimi', 'gato', '1 ano e meio', 'pequeno', 'Mimi é brincalhona, curiosa e sociável com outros gatos.', 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80', 1),
(5, 'Bob', 'cachorro', '3 anos', 'medio', 'Bob é um companheiro calmo e leal. Adora passeios na coleira.', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80', 1),
(6, 'Frajola', 'gato', '2 anos', 'medio', 'Frajola é carinhoso, ronrona bastante e gosta de brincar com bolinhas de papel.', 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80', 1);
