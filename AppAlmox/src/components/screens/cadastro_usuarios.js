import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Selecione o perfil');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSelect = (opcao) => {
    setSelectedOption(opcao);
    setModalVisible(false);
  };

  const cadastrarUsuario = async () => {
  if (!usuario.trim() || !senha.trim()) {
    Alert.alert('Atenção', 'Preencha o usuário e a senha.');
    return;
  }

  if (selectedOption === 'Selecione o perfil') {
    Alert.alert('Atenção', 'Selecione um perfil de usuário.');
    return;
  }

  setCarregando(true);

  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      Alert.alert('Erro', 'Faça login novamente para cadastrar usuários.');
      return;
    }

    const resposta = await fetch('http://10.154.20.110:5000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        usuario: usuario.trim(),
        senha: senha,
        papel: selectedOption === 'Administrador' ? 'administrador' : 'usuario',
      }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      Alert.alert('Erro', dados.mensagem || 'Não foi possível cadastrar o usuário.');
      return;
    }

    Alert.alert('Sucesso', dados.mensagem || 'Usuário cadastrado com sucesso!');

    setUsuario('');
    setSenha('');
    setSelectedOption('Selecione o perfil');

  } catch (erro) {
    console.error('Erro ao cadastrar usuário:', erro);
    Alert.alert('Erro de conexão', 'Não foi possível comunicar com o servidor.');
  } finally {
    setCarregando(false);
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../../assets/senai.png')}
          style={styles.senai}
          resizeMode="contain"
        />

        <Text style={styles.paragraph}>Cadastro de Usuários</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          placeholderTextColor="#888"
          value={usuario}
          onChangeText={setUsuario}
        />

        <TouchableOpacity
          style={styles.dropdownBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dropdownBtnText}>{selectedOption}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={cadastrarUsuario}
          disabled={carregando}
        >
          <Text style={styles.btnText}>
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleSelect('Administrador')}
              >
                <Text style={styles.optionText}>Administrador</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleSelect('Usuário Comum')}
              >
                <Text style={styles.optionText}>Usuário Comum</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002A54',
    padding: 16,
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform:[{ translateY: -9 }]
  },
  senai: {
    width: '100%',
    height: 80,
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#002A54',
    letterSpacing: 0.5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#333333',
    fontSize: 15,
    marginBottom: 12,
  },
  dropdownBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dropdownBtnText: {
    color: '#333333',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff7700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
