CREATE DATABASE cadastro;
USE cadastro;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    papel VARCHAR(30) NOT NULL
);

/*comando para ver a tabela no mysql workbench*/
SELECT * FROM usuarios;

/*serve para apagar todos os dados inseridos na tabela (só execute esse se algo der errado e quiser resetar os dados)*/
TRUNCATE TABLE usuarios;