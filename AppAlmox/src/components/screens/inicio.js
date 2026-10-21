import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, ScrollView, useWindowDimensions } from 'react-native';

import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Login from './login';
import CadastroItem from './cadastro-item';
import CadastroUsuarios from './cadastro_usuarios';
import Movimentacao from './movimentacao';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Home() {
  const opacidade = useRef(new Animated.Value(0)).current;
  const movimento = useRef(new Animated.Value(35)).current;
  const { width } = useWindowDimensions();

  useEffect(() => {
    opacidade.setValue(0);
    movimento.setValue(35);

    Animated.parallel([
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(movimento, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacidade, movimento]);

  const materiais = [];

  return (
    <View style={styles.homeContainer}>
      <Animated.View
        style={[
          styles.mensagem,
          {
            opacity: opacidade,
            transform: [{ translateY: movimento }],
          },
        ]}
      >
        <Text style={styles.welcome}>Bem-vindo ao</Text>
        <Text style={styles.title}>Almoxarifado SENAI</Text>
      </Animated.View>

      <View style={styles.linhaLaranja} />

      <View style={styles.areaTabela}>
        <ScrollView
          style={styles.listaMateriais}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
        >
          {materiais.length === 0 ? (
            <View style={styles.linhaVazia}>
              <Text style={styles.textoVazio}>
                Nenhum material encontrado no banco de dados
                do Almoxarifado.
              </Text>
            </View>
          ) : (
            materiais.map((item, index) => (
              <View
                key={item.id ?? index}
                style={[
                  styles.cartaoMaterial,
                  {
                    width: Math.max(
                      0,
                      Math.min(width - 40, 600)
                    ),
                  },
                ]}
              >
                <View style={styles.cabecalhoCartao}>
                  <Text style={styles.numeroMaterial}>
                    Material #{index + 1}
                  </Text>

                  <Text style={styles.categoriaMaterial}>
                    {item.categoria || 'Sem categoria'}
                  </Text>
                </View>

                {item.foto ? (
                  <Image
                    source={{ uri: item.foto }}
                    style={styles.fotoMaterial}
                    resizeMode="contain"
                  />
                ) : null}

                <View style={styles.detalhesMaterial}>
                  <View style={styles.linhaDetalhe}>
                    <Text style={styles.rotuloDetalhe}>
                      Nome
                    </Text>
                    <Text style={styles.valorDetalhe}>
                      {item.nome || '-'}
                    </Text>
                  </View>

                  <View style={styles.linhaDetalhe}>
                    <Text style={styles.rotuloDetalhe}>
                      Quantidade
                    </Text>
                    <Text style={styles.valorDetalhe}>
                      {item.quantidade ?? '-'}
                    </Text>
                  </View>

                  <View style={styles.linhaDetalhe}>
                    <Text style={styles.rotuloDetalhe}>
                      Preço
                    </Text>
                    <Text style={styles.valorDetalhe}>
                      {item.preco != null
                        ? `R$ ${item.preco}`
                        : '-'}
                    </Text>
                  </View>

                  <View style={styles.linhaDetalhe}>
                    <Text style={styles.rotuloDetalhe}>
                      Estoque mínimo
                    </Text>
                    <Text style={styles.valorDetalhe}>
                      {item.estoqueMinimo ??
                        item.estoque_minimo ??
                        '-'}
                    </Text>
                  </View>

                  <View style={styles.descricaoMaterial}>
                    <Text style={styles.rotuloDetalhe}>
                      Descrição adicional
                    </Text>
                    <Text style={styles.valorDescricao}>
                      {item.descricao || 'Sem descrição'}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}


function HeaderLogo() {
  return (
    <Image
      source={require('../../../assets/senai-logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  );
}

function MenuPrincipal() {
  return (
    <Drawer.Navigator
  initialRouteName="Home"
  screenOptions={({ navigation, route }) => ({
    headerStyle: {
      backgroundColor: '#FFFFFF',
      height: 110,
      borderBottomWidth: 4,
      borderBottomColor: '#FF5500',
      elevation: 0,
    },

    headerTitleAlign: 'left',
    headerTitleContainerStyle: {
      left: 5,
    },
    headerTitle: () => <HeaderLogo />,

    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.menuButton}
        accessibilityRole="button"
        accessibilityLabel="Abrir menu lateral"
      >
        <Ionicons
          name="menu-outline"
          size={28}
          color="#000000"
        />
      </TouchableOpacity>
    ),

    drawerStyle: {
      backgroundColor: '#F4F4F9',
      width: 250,
    },

    drawerActiveTintColor: '#00529E',
    drawerInactiveTintColor: '#333333',

    drawerLabelStyle: {
      fontSize: 15,
      marginLeft: 2,
    },

    drawerIcon: ({ color, size }) => {
      const icones = {
        Home: 'home-outline',
        CadastrodeItens: 'cube-outline',
        CadastroUsuarios: 'people-outline',
        Movimentacao: 'swap-horizontal-outline',
      };

      return (
        <Ionicons
          name={icones[route.name] || 'ellipse-outline'}
          size={size}
          color={color}
        />
      );
    },
  })}
>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: 'Início', drawerLabel: 'Início' }}
      />
      <Drawer.Screen
        name="CadastrodeItens"
        component={CadastroItem}
        options={{ title: 'Cadastro de Itens', drawerLabel: 'Cadastro de Itens' }}
      />
      <Drawer.Screen
        name="CadastroUsuarios"
        component={CadastroUsuarios}
        options={{ title: 'Cadastro de Usuários', drawerLabel: 'Cadastro de Usuários' }}
      />
      <Drawer.Screen
        name="Movimentacao"
        component={Movimentacao}
        options={{ title: 'Movimentações', drawerLabel: 'Movimentações' }}
      />
    </Drawer.Navigator>
  );
}

function Inicio() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Principal"
          component={MenuPrincipal}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#002A54',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  mensagem: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  linhaLaranja: {
    width: '100%',
    height: 3,
    backgroundColor: '#FF6900',
    borderRadius: 2,
    marginTop: 5,
    marginBottom: 18,
  },

  welcome: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  areaTabela: {
    flex: 1,
    width: '100%',
  },

  listaMateriais: {
    flex: 1,
  },

  listaConteudo: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  linhaVazia: {
    width: '100%',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1D2D59',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6900',
  },

  textoVazio: {
    color: '#FF6900',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },

  cartaoMaterial: {
    alignSelf: 'center',
    backgroundColor: '#1D2D59',
    borderRadius: 10,
    padding: 15,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6900',
  },

  cabecalhoCartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#34446B',
  },

  numeroMaterial: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },

  categoriaMaterial: {
    color: '#FF8A45',
    fontSize: 13,
    fontWeight: 'bold',
    flexShrink: 1,
  },

  detalhesMaterial: {
    width: '100%',
  },

  linhaDetalhe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 9,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#34446B',
  },

  rotuloDetalhe: {
    color: '#BFCDE0',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },

  valorDetalhe: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'right',
    flex: 1.3,
    flexWrap: 'wrap',
  },

  descricaoMaterial: {
    paddingTop: 12,
    gap: 7,
  },

  valorDescricao: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 21,
  },

  fotoMaterial: {
    width: '100%',
    height: 150,
    marginBottom: 12,
  },

  logo: {
    width: 130,
    height: 40,
  },

  menuButton: {
    marginLeft: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuIcon: {
    fontSize: 25,
    color: '#000000',
  },
});

registerRootComponent(Inicio);