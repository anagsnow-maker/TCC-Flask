import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

// CONFIGURAÇÃO DA URL DA API CONFIGURADA POR VOCÊ
const API_URL = 'http://10.154.20.120:5000/api'; 

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false); // Estado para o feedback visual de carregamento

  async function entrar() {
    if (!usuario.trim() || !senha) {
      Alert.alert(
        'Atenção',
        'Preencha o usuário e a senha.'
      );
      return;
    }

    try {
      setCarregando(true);

      // Enviando os dados para a rota /login da sua API
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuario, // Se sua API exigir "email", mude o nome da chave aqui
          senha: senha,
        }),
      });

      // Captura a resposta bruta como texto primeiro para evitar o crash do JSON Parse
      const textoBruto = await response.text();

      // Se a resposta começar com '<', o backend enviou um HTML de erro (404, 500, CORS, etc.)
      if (textoBruto.trim().startsWith('<')) {
        console.log("⚠️ O BACKEND RETORNOU HTML EM VEZ DE JSON. CONTEÚDO DA RESPOSTA:");
        console.log(textoBruto);
        Alert.alert('Erro no Servidor', 'O servidor retornou uma página HTML em vez de dados. Verifique o console do terminal.');
        return;
      }

      // Se não for HTML, processa o JSON com segurança
      const dados = JSON.parse(textoBruto);

      if (response.ok) {
        // Sucesso! API retornou status 200~299
        // Se a sua API enviar um Token JWT, você pode salvá-lo aqui (ex: AsyncStorage)
        navigation.replace('Principal');
      } else {
        // Erro controlado vindo do backend (ex: senha errada ou usuário inexistente)
        Alert.alert('Erro', dados.mensagem || 'Usuário ou senha incorretos.');
      }
    } catch (error) {
      // Erros de rede (API fora do ar, IP incorreto, falta de internet)
      Alert.alert('Erro de Conexão', 'Não foi possível se comunicar com o servidor.');
      console.error("Erro na requisição:", error);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cartaoLogin}>
        <Image
          source={require('../../../assets/senai.png')}
          style={styles.logoLogin}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>Seja bem-vindo</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário ou e-mail"
          placeholderTextColor="#777777"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
          editable={!carregando} // Desabilita o input enquanto carrega
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#777777"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          editable={!carregando} // Desabilita o input enquanto carrega
        />

        <TouchableOpacity
          style={[styles.botao, carregando && styles.botaoDesabilitado]}
          onPress={entrar}
          disabled={carregando} // Impede cliques repetidos
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBotao}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002A54',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  logo: {
    width: 180,
    height: 80,
    marginBottom: 25,
  },
  cartaoLogin: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCCCCC', 
    alignItems: 'center',
  },
  titulo: {
    color: '#002A54',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 20,
  },
  subtitulo: {
    color: '#555555',
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
    color: '#222222',
  },
  botao: {
    width: '100%',
    backgroundColor: '#FF6900',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoDesabilitado: {
    backgroundColor: '#FFA366', // Cor do botão um pouco mais clara quando estiver carregando
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  logoLogin: {
    width: 160,
    height: 75,
    alignSelf: 'center',
    marginBottom: 15,
  },
});
