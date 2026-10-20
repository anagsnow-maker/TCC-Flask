import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Movimentacao() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        mOC
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