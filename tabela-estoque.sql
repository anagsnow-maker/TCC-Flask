CREATE DATABASE tcc_almoxarifado;
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

/*comando para inserir itens na tabela manualmente pelo mysql workbench*/
INSERT INTO estoque (id, nome, quantidade, preco, categoria, estoque_minimo, descricao_adicional)
VALUES (1, 'parafusos', '2000', '0.15', 'Geral', '100', 'tem de vários tamanhos, é de metal');

/*comando para ver a tabela no mysql workbench*/
SELECT * FROM estoque;

/*serve para apagar todos os dados inseridos na tabela (só execute esse se algo der errado e quiser resetar os dados)*/
TRUNCATE TABLE estoque;