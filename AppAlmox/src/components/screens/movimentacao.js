
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import {
  Card,
  Button,
  TextInput,
} from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

const API_URL = 'http://192.168.100.105:5000/api';

export default function App() {
  const [tipo, setTipo] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Busca os itens cadastrados no estoque
  async function carregarItens() {
    try {
      setCarregando(true);

      const resposta = await fetch(`${API_URL}/estoque`);

      if (!resposta.ok) {
        throw new Error('Não foi possível consultar o estoque.');
      }

      const dados = await resposta.json();

      if (!Array.isArray(dados)) {
        throw new Error('Resposta inválida do servidor.');
      }

      setItens(dados);

    } catch (erro) {
      console.log('Erro ao carregar itens:', erro);

      Alert.alert(
        'Erro de conexão',
        'Não foi possível carregar os itens do estoque. Verifique se o servidor está funcionando.'
      );

    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarItens();
  }, []);

  // Registra uma entrada ou saída no estoque
  async function salvarMovimentacao() {
    if (!itemId) {
      Alert.alert('Atenção', 'Selecione um item.');
      return;
    }

    if (!tipo) {
      Alert.alert('Atenção', 'Selecione o tipo de movimentação.');
      return;
    }

    const quantidadeNumerica = Number(quantidade);

    if (
      !quantidade.trim() ||
      !Number.isInteger(quantidadeNumerica) ||
      quantidadeNumerica <= 0
    ) {
      Alert.alert(
        'Atenção',
        'Digite uma quantidade inteira maior que zero.'
      );
      return;
    }

    const itemSelecionado = itens.find(
      produto => String(produto.id) === String(itemId)
    );

    if (!itemSelecionado) {
      Alert.alert('Erro', 'O item selecionado não foi encontrado.');
      return;
    }

    try {
      setSalvando(true);

      const resposta = await fetch(`${API_URL}/movimentacao`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: itemSelecionado.nome,
          quantidade: quantidadeNumerica,
          tipo: tipo,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok || dados.status !== 'sucesso') {
        Alert.alert(
          'Não foi possível realizar a movimentação',
          dados.mensagem || 'Ocorreu um erro ao atualizar o estoque.'
        );
        return;
      }

      Alert.alert(
        'Sucesso!',
        `${dados.mensagem}\n\nItem: ${itemSelecionado.nome}\nNova quantidade: ${dados.nova_quantidade}`
      );

      // Limpa os campos após a operação
      setItemId('');
      setQuantidade('');
      setTipo('');

      // Atualiza os itens disponíveis
      await carregarItens();

    } catch (erro) {
      console.log('Erro na movimentação:', erro);

      Alert.alert(
        'Erro de conexão',
        'Não foi possível comunicar com o servidor.'
      );

    } finally {
      setSalvando(false);
    }
  }

  return (
    <View style={styles.container}>

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
                selectedValue={itemId}
                onValueChange={(valor) => setItemId(valor)}
                mode="dialog"
                style={styles.picker}
                dropdownIconColor="#002A54"
                enabled={!carregando && itens.length > 0}
              >
                <Picker.Item
                  label={
                    carregando
                      ? 'Carregando itens...'
                      : itens.length === 0
                        ? 'Nenhum item cadastrado'
                        : 'Selecione um item'
                  }
                  value=""
                />

                {itens.map((produto) => (
                  <Picker.Item
                    key={produto.id}
                    label={produto.nome}
                    value={String(produto.id)}
                  />
                ))}
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
                value={quantidade}
                onChangeText={setQuantidade}
              />
            </View>

            <Text style={styles.label}>
              TIPO DE MOVIMENTAÇÃO
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tipo}
                onValueChange={(valor) => setTipo(valor)}
                mode="dropdown"
                style={styles.picker}
                dropdownIconColor="#002A54"
              >
                <Picker.Item label="Selecione" value="" />
                <Picker.Item label="Entrada" value="entrada" />
                <Picker.Item label="Saída" value="saida" />
              </Picker>
            </View>

            <Button
              mode="contained"
              buttonColor="#FF9000"
              textColor="#FFFFFF"
              style={styles.saveButton}
              onPress={salvarMovimentacao}
              loading={salvando}
              disabled={salvando || carregando || itens.length === 0}
            >
              {salvando ? 'SALVANDO...' : 'SALVAR ITEM'}
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
},

  saveButton: {
    borderRadius: 9,
    paddingVertical: 3,
  },

});
