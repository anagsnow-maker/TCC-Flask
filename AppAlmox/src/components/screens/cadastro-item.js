import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CadastroItem() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Cadastro de Itens
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});