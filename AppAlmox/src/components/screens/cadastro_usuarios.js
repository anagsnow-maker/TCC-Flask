import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Imagem fora do card */}
      <Image 
        source={require('./assets/senai-logo.png')}
        style={styles.senai}
        resizeMode="contain"
      />

      {/* Caixa de fundo para o cadastro/login */}
      <View style={styles.card}>
        <Text style={styles.paragraph}>
          Cadastro / Login
        </Text> 

        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário ou e-mail"
          placeholderTextColor="#ccc"
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua nova senha"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0066ff', // Cor de fundo da tela alterada para azul #0066ff
    padding: 16,
  },
  card: {
    width: '90%',
    backgroundColor: '#1b5063',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paragraph: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 12,
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#1b5063',
    fontSize: 16,
    fontWeight: 'bold',
  },
  senai: {
    width: '80%',
    height: 100,
    marginBottom: 20,
  },
});