import { StyleSheet, Text, View, ScrollView, Image, PaperProvider, } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';

export default function App() {
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
              CADASTRO DE ITEM
            </Text>

            <TextInput
              label="Nome do item"
              placeholder="Ex: Multímetro Digital"
              mode="outlined"
              outlineColor="#CCCCCC"
              activeOutlineColor="#FF9000"
              style={styles.input}
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
              />

              <TextInput
                label="Preço"
                placeholder="0.00"
                keyboardType="decimal-pad"
                mode="outlined"
                outlineColor="#CCCCCC"
               activeOutlineColor="#FF9000"        
                style={[styles.input, styles.half]}
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
              />

              <TextInput
                label="Estoque mínimo"
                placeholder="Ex: 5"
                keyboardType="numeric"
                mode="outlined"
                outlineColor="#CCCCCC"
               activeOutlineColor="#FF9000"
                style={[styles.input, styles.half]}
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
            />

            {/* Foto do item */}
          <Text style={styles.photoLabel}>
          FOTO DO ITEM (OBRIGATÓRIO)
           </Text>
            <View style={styles.photoBox}>
              <Text style={styles.photoText}>
                Selecione uma foto do item
              </Text>
            </View>

            {/* Botão salvar */}
            <Button
              mode="contained"
              buttonColor="orange"
              textColor="#FFFFFF"
              style={styles.saveButton}
              onPress={() => {}}
               theme={{ colors: { primary: '#FF9000' } }}
            

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



  menu: {
    width: 42,
    height: 38,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  line: {
    width: 22,
    height: 2,
    backgroundColor: '#444444',
    marginVertical: 3,
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
    padding: 18,
    marginBottom: 18,
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },

  photoText: {
    color: '#666666',
    fontSize: 13,
  },

  saveButton: {
    borderRadius: 9,
    paddingVertical: 3,
    buttonColor: 'orange',
  },
});
