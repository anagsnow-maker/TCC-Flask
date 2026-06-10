import os
from flask import Flask, render_template, request, jsonify
# Quando for juntar com o MySQL, apague o '#' da linha abaixo:
import mysql.connector

app = Flask(__name__)

# Configuração da pasta onde as fotos dos itens serão salvas
UPLOAD_FOLDER = os.path.join('static', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Garante que a pasta de uploads exista
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 1. CONEXÃO COM O BANCO DE DADOS (Deixado pronto para o futuro)
# Quando seu colega entregar o banco, tire o '#' de todas as linhas abaixo:
def obter_conexao():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Sofia1211",
        database="tcc_almoxarifado",
        port=3306
    )

# Rota para exibir a página do formulário
@app.route('/')
def index():
    return render_template('cadastro-item.html')

@app.route('/movimentacao')
def movimentacao():
    return render_template('movimentacao.html')

import os
import mysql.connector
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def obter_conexao():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Sofia1211",
        database="tcc_almoxarifado",
        port=3306
    )
# Tabela
@app.route('/inicio')
def home():
    conexao = obter_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM produtos")
    produtos_do_banco = cursor.fetchall()

    cursor.close()
    conexao.close()

    return render_template('inicio.html', produtos=produtos_do_banco)

# 2. ROTA QUE RECEBE E TRATA OS DADOS DO FORMULÁRIO
@app.route('/salvar-item', methods=['POST'])
def salvar_item():
    try:
        # Recebendo os dados textuais do formulário
        nome = request.form.get('nomeItem', '')
        descricao = request.form.get('descricaoItem', '')
        quantidade = request.form.get('qtdItem', 0)

        # 3. GERENCIANDO O ARQUIVO DE IMAGEM
        if 'fotoItem' not in request.files:
            return jsonify({"status": "erro", "mensagem": "A foto do item é obrigatória."}), 400
            
        arquivo_foto = request.files['fotoItem']
        
        if arquivo_foto.filename == '':
            return jsonify({"status": "erro", "mensagem": "A foto do item é obrigatória."}), 400

        if arquivo_foto:
            # Salva o arquivo com o nome original dentro de static/uploads
            caminho_final = os.path.join(app.config['UPLOAD_FOLDER'], arquivo_foto.filename)
            arquivo_foto.save(caminho_final)
            
            # Caminho que será salvo no banco de dados
            url_imagem_banco = f"uploads/{arquivo_foto.filename}"

            # 4. PERSISTÊNCIA NO BANCO DE DADOS (Desativado temporariamente para testes)
            # COMENTÁRIO DE TESTE: Quando for integrar com o banco de dados do colega, 
            # basta apagar o '#' das 7 linhas logo abaixo:
            # conexao = obter_conexao()
            # cursor = conexao.cursor()
            # comando = "INSERT INTO produtos (nome, descricao, quantidade_inicial, imagem_url) VALUES (%s, %s, %s, %s)"
            # valores = (nome, descricao, quantidade, url_imagem_banco)
            # cursor.execute(comando, valores)
            # conexao.commit()
            # cursor.close()
            # conexao.close()

            # Esse print vai mostrar no seu terminal do VS Code o que o usuário digitou
            print(f"\n--- [TESTE FLASK] DADOS RECEBIDOS COM SUCESSO ---")
            print(f"Nome: {nome} | Qtd: {quantidade} | Imagem salva em: {url_imagem_banco}\n")

            return jsonify({
                "status": "sucesso", 
                "mensagem": f"Item '{nome}' recebido pelo Flask! Imagem salva na pasta uploads (Simulação sem MySQL)."
            })

    except Exception as e:
        return jsonify({"status": "erro", "mensagem": f"Erro no servidor: {str(e)}"}), 500

@app.route('/solicitar-movimentacao', methods=['POST'])
def solicitar_movimentacao():

    item = request.form.get('item')
    quantidade = request.form.get('quantidade')
    tipo = request.form.get('tipo')
    finalidade = request.form.get('finalidade')

    print("ITEM:", item)
    print("QUANTIDADE:", quantidade)
    print("TIPO:", tipo)
    print("FINALIDADE:", finalidade)

    return jsonify({
        "status": "sucesso",
        "mensagem": "Movimentação registrada com sucesso!"
    })

if __name__ == '__main__':
    app.run(debug=True)