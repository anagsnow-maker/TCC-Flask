import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Image
        source={require('./assets/Marca_SENAI.png')}
        style={styles.senai}
        resizeMode="contain"
      />

      <Text style={styles.paragraph}>
        Login
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu usuário ou e-mail"
        placeholderTextColor="#ccc"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f37ff',
    padding: 24,
  },
  senai: {
    width: 350,
    height: 100,
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 32,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 16,
  },
  btn: {
    width: '100%',
    height: 52,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#0f37ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});