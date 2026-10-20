import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, } from 'react-native';

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {
    if (!usuario.trim() || !senha) {
      Alert.alert(
        'Atencao',
        'Preencha o usuario e a senha.'
      );
      return;
    }

    // Ainda não valida nada.
    navigation.replace('Principal');
  }

  return (

<View style={styles.container}>
  <View style={styles.cartaoLogin}>
  <Image
    source={require('../../../assets/senai.png')}
    style={styles.logoLogin}
    resizeMode="contain"
  />

  <Text style={styles.titulo}>Login</Text>


    <TextInput
      style={styles.input}
      placeholder="Usuario ou e-mail"
      placeholderTextColor="#777777"
      value={usuario}
      onChangeText={setUsuario}
      autoCapitalize="none"
    />

    <TextInput
      style={styles.input}
      placeholder="Senha"
      placeholderTextColor="#777777"
      value={senha}
      onChangeText={setSenha}
      secureTextEntry
    />

    <TouchableOpacity
      style={styles.botao}
      onPress={entrar}
    >
      <Text style={styles.textoBotao}>Entrar</Text>
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