CREATE DATABASE almoxarifado;

USE almoxarifado;

CREATE TABLE estoque (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade VARCHAR(100)
);

INSERT INTO estoque (id, nome, quantidade)
VALUES (1, 'parafusos', '100');
    
INSERT INTO estoque (nome, quantidade)
VALUES ('capacetes', '50');

INSERT INTO estoque (nome, quantidade)
VALUES ('chave philips', '75');

SELECT * FROM estoque