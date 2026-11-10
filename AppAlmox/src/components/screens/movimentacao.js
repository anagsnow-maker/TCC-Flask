
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Provider as PaperProvider, Card, Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [value, setValue] = useState('');
  const [item, setItem] = useState('');

  return (
    <View style={styles.container}>

      {/* Formulário */}
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.card}>
          <Card.Content>

            <Image
              source={{
                uri: 'https://logodownload.org/wp-content/uploads/2019/08/senai-logo-1.png'
              }}
              style={styles.formLogoImage}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              MOVIMENTAÇÃO DE ESTOQUE
            </Text>

            <Text style={styles.label}>ITEM</Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={item}
                onValueChange={(itemValue) => setItem(itemValue)}
                mode="dropdown"
                style={styles.picker}
                dropdownIconColor="#002A54"
              >
                <Picker.Item label="Selecione um item" value="" />
              </Picker>
            </View>

            <Text style={styles.label}>QUANTIDADE</Text>

            <View style={styles.row}>
              <TextInput
                label="Quantidade"
                placeholder="0"
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#CCCCCC"
                activeOutlineColor="#FF9000"
                style={[styles.input, styles.half]}
              />
            </View>

            <Text style={styles.label}>
              TIPO DE MOVIMENTAÇÃO
            </Text>

            {/* Tipo de movimentação */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => setValue(itemValue)}
                mode="dropdown"
                style={styles.picker}
                dropdownIconColor="#002A54"
              >
                <Picker.Item label="Selecione" value="" />
                <Picker.Item label="Entrada" value="entrada" />
                <Picker.Item label="Saída" value="saida" />
              </Picker>
            </View>

            {/* Botão salvar */}
            <Button
              mode="contained"
              buttonColor="#FF9000"
              textColor="#FFFFFF"
              style={styles.saveButton}
              onPress={() => {}}
            >
              SALVAR ITEM
            </Button>

          </Card.Content>
        </Card>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#002A54',
  },

  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#002A54',
    marginBottom: 2,
  },

  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  card: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 4,
    alignSelf: 'center',
    transform: [{ translateY: -21 }],
  },

  formLogoImage: {
    width: 290,
    height: 80,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 18,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002A54',
    textAlign: 'center',
    marginBottom: 22,
  },

  input: {
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  half: {
    flex: 1,
    minWidth: 0,
  },

  picker: {
    height: 50,
    width: '100%',
    color: '#000000',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    overflow: 'hidden',
  },

  saveButton: {
    borderRadius: 9,
    paddingVertical: 3,
  },

});
