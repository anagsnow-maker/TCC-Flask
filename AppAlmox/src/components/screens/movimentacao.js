import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Provider as PaperProvider, Card, Button, TextInput } from 'react-native-paper';

// Criamos um Picker falso e simples para o app não quebrar e você não precisar instalar nada agora:
const Picker = () => null; 


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
              MOVIMENTAÇÃO DE ESTOQUE
            </Text>

            <Text style={styles.label}>ITEM</Text>
            


            <TextInput
              label="Selecione um item"
              placeholder="Ex: Multímetro Digital"
              mode="outlined"
              outlineColor="#CCCCCC"
              activeOutlineColor="#FF9000"
              style={styles.input}
            />

            <Text style={styles.label}>QUANTIDADE</Text>

            {/* Quantidade */}
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

            <Text style={styles.label}>TIPO DE MOVIMENTAÇÃO</Text>

            {/* TIPO DE MOVIMENTAÇÃO */}
            <View style={styles.row}>
              <TextInput
                label="Selecione"
                placeholder="Geral"
                mode="outlined"
                outlineColor="#CCCCCC"
                activeOutlineColor="#FF9000"
                style={[styles.input, styles.half]}
                
              />
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

       label: {
     fontSize: 13,
     fontWeight: 'bold',
     color: '#002A54',
       marginBottom: 2,
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
