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

/*comando para apagar a tabela e começar de novo caso de merda*/
DROP TABLE estoque;



CREATE DATABASE cadastro;
USE cadastro;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    papel VARCHAR(50) NOT NULL
);

INSERT INTO usuarios (id, usuario, senha, papel)
VALUES (1, 'ronaldinho', '12345', 'administrador');

/*comando para ver a tabela no mysql workbench*/
SELECT * FROM usuarios;

/*serve para apagar todos os dados inseridos na tabela (só execute esse se algo der errado e quiser resetar os dados)*/
TRUNCATE TABLE usuarios;

/*Por algum motivo quando abrimos o banco de dados ele já vem com as tabelas criadas em uma versão antiga, para corrigir o problema, use esse comando abaixo
  e depois limpe os usuários da tabela com o comando de cima, e depois insira um usuário administrador manualmente(também já tem um comando pra isso ali em cima)*/
ALTER TABLE usuarios MODIFY papel VARCHAR(30);