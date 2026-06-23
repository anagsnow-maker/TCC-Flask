import os
import mysql.connector
# Adicionado 'redirect' e 'flash' nas importações
from flask import Flask, render_template, request, jsonify, redirect, flash

app = Flask(__name__)
# O Flask precisa de uma chave secreta (secret_key) para usar o 'flash' (mensagens de erro/sucesso)
app.secret_key = 'chave_secreta_para_o_tcc'

# Configuração da pasta onde as fotos dos itens serão salvas
UPLOAD_FOLDER = os.path.join('static', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Garante que a pasta de uploads exista
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def obter_conexao():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # <- Certifique-se de que a senha deste PC é essa
        database="tcc_almoxarifado",
        port=3306
    )

# USUÁRIO E SENHA DEFINIDOS (Altere aqui para o que você quiser)
USUARIO_CORRETO = "admin"
SENHA_CORRETA = "senai123"

# --- ROTAS DE EXIBIÇÃO DE PÁGINAS E PROCESSAMENTO ---

# Alterado para aceitar tanto GET (abrir a página) quanto POST (enviar o formulário)
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Pegando os dados que o usuário digitou no formulário
        usuario_digitado = request.form.get('username')
        senha_digitada = request.form.get('password')

        # Verificando se os dados estão corretos
        if usuario_digitado == USUARIO_CORRETO and senha_digitada == SENHA_CORRETA:
            # Se der certo, redireciona para a página inicial ('home')
            return redirect('/inicio')
        else:
            # Se der errado, exibe uma mensagem de erro na tela (opcional)
            return "Usuário ou senha incorretos! <a href='/login'>Tentar novamente</a>", 401

    # Se for requisição GET, apenas exibe a página de login normalmente
    return render_template('login.html')

@app.route('/')
def index():
    return render_template('cadastro-item.html')

@app.route('/movimentacao')
def movimentacao():
    return render_template('movimentacao.html')

@app.route('/inicio')
def home():
    try:
        conexao = obter_conexao()
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT * FROM estoque")
        produtos_do_banco = cursor.fetchall()
        cursor.close()
        conexao.close()
        return render_template('inicio.html', produtos=produtos_do_banco)
    except Exception as e:
        return f"Erro ao carregar a página inicial: {str(e)}", 500

# --- ROTAS DE PROCESSAMENTO DE DADOS (POST) ---

@app.route('/salvar-item', methods=['POST'])
def salvar_item():
    try:
        nome = request.form.get('nomeItem', '')
        descricao = request.form.get('descricaoItem', '')
        quantidade = request.form.get('qtdItem', 0)

        if 'fotoItem' not in request.files:
            return jsonify({"status": "erro", "mensagem": "A foto do item é obrigatória."}), 400
            
        arquivo_foto = request.files['fotoItem']
        
        if arquivo_foto.filename == '':
            return jsonify({"status": "erro", "mensagem": "A foto do item é obrigatória."}), 400

        if arquivo_foto:
            caminho_final = os.path.join(app.config['UPLOAD_FOLDER'], arquivo_foto.filename)
            arquivo_foto.save(caminho_final)
            
            url_imagem_banco = f"uploads/{arquivo_foto.filename}"

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
    app.run(debug=True, host="0.0.0.0", port=5000)