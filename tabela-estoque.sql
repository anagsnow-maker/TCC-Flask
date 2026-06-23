CREATE DATABASE tcc_almoxarifado;
USE tcc_almoxarifado;

CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    quantidade INT,
    estoque_minimo INT,
    descricao VARCHAR(255),
    preco DECIMAL(10,2),
    categoria VARCHAR(50),
    foto VARCHAR(255)
);

