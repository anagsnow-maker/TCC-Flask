-- ==========================================
-- BANCO: tcc_almoxarifado
-- ==========================================

USE tcc_almoxarifado;

CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    quantidade INT,
    preco DECIMAL(10,2),
    categoria VARCHAR(50),
    estoque_minimo INT,
    descricao_adicional VARCHAR(255),
    foto VARCHAR(255)
);


-- ==========================================
-- BANCO: cadastro
-- ==========================================

USE cadastro;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    papel VARCHAR(50) NOT NULL
);

INSERT INTO usuarios (id, usuario, senha, papel)
VALUES (1, 'ADM', '12345', 'administrador');