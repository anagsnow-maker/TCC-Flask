
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, } from 'react-native';

export default function CadastroUsuarios() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cadastrar() {
    if (!nome.trim() || !email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    Alert.alert(
      'Formulário preenchido',
      'A integração com a API Flask será feita na próxima etapa.'
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Usuários</Text>
      <View style={styles.linhaLaranja} />

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar usuário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    color: '#002A54',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linhaLaranja: {
    height: 3,
    backgroundColor: '#FF6900',
    marginTop: 18,
    marginBottom: 28,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D0D7DE',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#002A54',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
