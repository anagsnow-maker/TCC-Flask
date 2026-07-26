CREATE DATABASE cadastro_user;
USE cadastro_user;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100),
    senha VARCHAR(255),
    papel VARCHAR(50)
);

SELECT * FROM usuarios;

INSERT INTO usuarios (usuario, senha, papel) 
VALUES ('admin', ' ', 'admin');