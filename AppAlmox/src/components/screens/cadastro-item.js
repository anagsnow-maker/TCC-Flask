import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import {
  Alert,
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  TextInput,
  Button,
  Card,
} from 'react-native-paper';

export default function App() {
  const [foto, setFoto] = useState(null);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const [descricao, setDescricao] = useState('');

  // Abrir a galeria do celular
  const selecionarFoto = async () => {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          'Permissão necessária',
          'Permita o acesso às fotos para selecionar uma imagem.'
        );
        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

      if (!resultado.canceled && resultado.assets?.length > 0) {
        setFoto(resultado.assets[0].uri);
      }
    } catch (erro) {
      Alert.alert(
        'Erro',
        'Não foi possível abrir a galeria. Tente novamente.'
      );
    }
  };

  // Validar o formulário
  const salvarItem = () => {
    if (
      !nome.trim() ||
      !quantidade.trim() ||
      !preco.trim() ||
      !categoria.trim() ||
      !estoqueMinimo.trim() ||
      !foto
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha os campos e selecione uma foto do item.'
      );
      return;
    }

    Alert.alert(
      'Formulário preenchido',
      'Os dados foram validados. Para salvar permanentemente, conecte o formulário a um banco de dados.'
    );
  };

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
                uri: 'https://logodownload.org/wp-content/uploads/2019/08/senai-logo-1.png',
              }}
              style={styles.formLogoImage}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              CADASTRO DE ITEM
            </Text>

            <TextInput
              label="Nome do item"
              placeholder="Ex: Multímetro Digital"
              mode="outlined"
              outlineColor="#CCCCCC"
              activeOutlineColor="#FF9000"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />

            {/* Quantidade e preço */}
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

              <TextInput
                label="Preço"
                placeholder="0.00"
                keyboardType="decimal-pad"
                mode="outlined"
                outlineColor="#CCCCCC"
                activeOutlineColor="#FF9000"
                style={[styles.input, styles.half]}
                value={preco}
                onChangeText={setPreco}
              />
            </View>

            {/* Categoria e estoque */}
            <View style={styles.row}>
              <TextInput
                label="Categoria"
                placeholder="Geral"
                mode="outlined"
                outlineColor="#CCCCCC"
                activeOutlineColor="#FF9000"
                style={[styles.input, styles.half]}
                value={categoria}
                onChangeText={setCategoria}
              />

              <TextInput
                label="Estoque mínimo"
                placeholder="Ex: 5"
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#CCCCCC"
                activeOutlineColor="#FF9000"
                style={[styles.input, styles.half]}
                value={estoqueMinimo}
                onChangeText={setEstoqueMinimo}
              />
            </View>

            {/* Descrição */}
            <TextInput
              label="Descrição"
              placeholder="Detalhes adicionais..."
              mode="outlined"
              outlineColor="#CCCCCC"
              activeOutlineColor="#FF9000"
              multiline
              numberOfLines={3}
              style={styles.description}
              value={descricao}
              onChangeText={setDescricao}
            />

            {/* Foto do item */}
            <Text style={styles.photoLabel}>
              FOTO DO ITEM (OBRIGATÓRIO)
            </Text>

            <TouchableOpacity
              style={styles.photoBox}
              onPress={selecionarFoto}                                    
              activeOpacity={0.7}      
            >
              {foto ? (
                <>
                  <Image
                    source={{ uri: foto }}
                    style={styles.previewImage}
                    resizeMode="cover"
                  />

                  <Text style={styles.photoText}>
                    Toque para trocar a foto
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.photoIcon}>＋</Text>

                  <Text style={styles.photoText}>
                    Toque aqui para selecionar uma foto
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Botão salvar */}
            <Button
              mode="contained"
              buttonColor="#FF9000"
              textColor="#FFFFFF"
              style={styles.saveButton}
              onPress={salvarItem}
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
    transform: [{ translateY: -9 }],
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

  description: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },

  photoLabel: {
    fontSize: 11,
    color: '#002A54',
    fontWeight: '500',
    marginBottom: 8,
  },

  photoBox: {
    borderWidth: 1,
    borderColor: '#CCD6E2',
    borderStyle: 'dashed',
    padding: 0,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 8,


  
  },

  photoIcon: {
    fontSize: 30,
    color: '#FF9000',
    marginBottom: 6,
  },

  photoText: {
    color: '#666666',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },

  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },

  saveButton: {
    borderRadius: 9,
    paddingVertical: 3,
  },
});
