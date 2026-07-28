import os
import mysql.connector
from flask import Flask, render_template, request, jsonify, redirect, flash

app = Flask(__name__)
app.secret_key = 'chave_secreta_para_o_tcc'

UPLOAD_FOLDER = os.path.join('static', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def obter_conexao():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  
        database="tcc_almoxarifado",
        port=3306
    )

def obter_conexao_cadastro():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  
        database="cadastro",
        port=3306
    )

# --- ROTAS DE EXIBIÇÃO DE PÁGINAS E PROCESSAMENTO(teste) ---

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Pegando os dados que o usuário digitou no formulário
        usuario_digitado = request.form.get('username')
        senha_digitada = request.form.get('password')

        conexao = obter_conexao_cadastro()
        cursor = conexao.cursor()
        
        query = "SELECT usuario, senha, papel FROM usuarios WHERE usuario = %s"
        valores = (usuario_digitado,)

        cursor.execute(query,valores)

        consulta = cursor.fetchone()

        if consulta is None:
            return "Usuário inexistente!"
        
        if consulta is not None:
            if senha_digitada == consulta[1]:
            # Se der certo, redireciona para a página inicial ('home')
                return redirect('/inicio')
            else:
                return "Usuario existe, mas senha incorreta!"

    # Se for requisição GET, apenas exibe a página de login normalmente
    return render_template('login_le.html')

@app.route('/cadastro', methods=['POST', 'GET'])
def index():
    usuario = request.form.get('campo1')
    senha = request.form.get('campo2')
    papel = request.form.get('campo3')

    query = "insert into usuarios (usuario, senha, papel) values (%s, %s, %s);"
    valores = (usuario, senha, papel)

    conexao = obter_conexao_cadastro()
    cursor = conexao.cursor()
    cursor.execute(query, valores)
    conexao.commit()

    return render_template('cadastro-item.html')
    

@app.route('/cadastro-usuario', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        usuario = request.form.get('campo1')
        senha = request.form.get('campo2')
        papel = request.form.get('campo3')

        query = "INSERT INTO usuarios (usuario, senha, papel) VALUES (%s, %s, %s);"
        valores = (usuario, senha, papel)

        conexao = obter_conexao_cadastro()
        cursor = conexao.cursor()
        cursor.execute(query, valores)
        conexao.commit()
        cursor.close()
        conexao.close()

        # Após salvar o novo usuário, redireciona para a tela de Login ('/')
        return redirect('/')

    # Se for requisição GET (apenas abrindo a página):
    return render_template('cadastro_usuarios.html')

@app.route('/movimentacao')
def movimentacao():
    conexao = obter_conexao()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT id, nome FROM estoque ORDER BY nome")
    itens = cursor.fetchall()

    cursor.close()
    conexao.close()

    return render_template('movimentacao.html', itens=itens)

@app.route('/cadastro-concluído')
def cadastro_concluído():
    return render_template('cadastro_concluído')



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
        return f"Erro ao carregar a página inicial: {str(e)}"


@app.route('/salvar-item', methods=['POST'])
def salvar_item():
    # Pegando os dados usando EXATAMENTE os mesmos nomes do 'name' no HTML
    nome = request.form.get('nomeItem', '')
    quantidade = request.form.get('qtdItem', 0)
    preco = request.form.get('precoItem', 0.00)
    categoria = request.form.get('statusItem', 'Geral')
    estoque_minimo = request.form.get('estoqueMinimo', 0)
    descricao = request.form.get('descricaoItem', '')

    arquivo_foto = request.files.get('fotoItem')
    url_imagem_banco = None

    if arquivo_foto and arquivo_foto.filename != '':
        caminho_final = os.path.join(app.config['UPLOAD_FOLDER'], arquivo_foto.filename)
        arquivo_foto.save(caminho_final)
        url_imagem_banco = f"uploads/{arquivo_foto.filename}"
    
    try:
        conexao = obter_conexao()
        cursor = conexao.cursor()
        
        # SQL sem 'localizacao', combinando 100% com a tabela do MySQL Workbench
        comando_sql = """
            INSERT INTO estoque (nome, quantidade, preco, categoria, estoque_minimo, descricao_adicional, foto)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        valores = (nome, quantidade, preco, categoria, estoque_minimo, descricao, url_imagem_banco)
        
        cursor.execute(comando_sql, valores)
        conexao.commit()
        cursor.close()
        conexao.close()
    except Exception as e:
        print(f"Erro ao salvar item no banco: {e}")

    # Redireciona para /inicio e recarrega a tabela com os novos dados
    return redirect('/inicio')

@app.route('/solicitar-movimentacao', methods=['POST'])
def solicitar_movimentacao():
    item = request.form.get('item')
    quantidade = int(request.form.get('quantidade'))
    tipo = request.form.get('tipo')
    finalidade = request.form.get('finalidade')

    conexao = obter_conexao()
    cursor = conexao.cursor(dictionary=True)

    # Procura o item pelo nome
    cursor.execute("SELECT * FROM estoque WHERE nome = %s", (item,))
    produto = cursor.fetchone()

    if not produto:
        cursor.close()
        conexao.close()
        return jsonify({
            "status": "erro",
            "mensagem": "Item não encontrado."
        })

    quantidade_atual = produto["quantidade"]

    # Entrada
    if tipo == "entrada":
        nova_quantidade = quantidade_atual + quantidade

    # Saída
    elif tipo == "saida":
        if quantidade > quantidade_atual:
            cursor.close()
            conexao.close()

            return jsonify({
                "status": "erro",
                "mensagem": "Quantidade insuficiente em estoque."
            })

        nova_quantidade = quantidade_atual - quantidade

    else:
        cursor.close()
        conexao.close()

        return jsonify({
            "status": "erro",
            "mensagem": "Tipo de movimentação inválido."
        })

    cursor.execute(
        "UPDATE estoque SET quantidade = %s WHERE id = %s",
        (nova_quantidade, produto["id"])
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return jsonify({
        "status": "sucesso",
        "mensagem": "Movimentação realizada com sucesso!"
    })

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)