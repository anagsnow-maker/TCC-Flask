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
    status_item VARCHAR(50),
    foto VARCHAR(255)
);

/*comando para inserir itens na tabela manualmente pelo mysql workbench*/
INSERT INTO estoque (id, nome, quantidade)
VALUES (1, 'parafusos', '100');

/*comando para ver a tabela no mysql workbench*/
SELECT * FROM estoque;

/*serve para apagar todos os dados inseridos na tabela (só execute esse se algo der errado e quiser resetar os dados)*/
TRUNCATE TABLE estoque;

