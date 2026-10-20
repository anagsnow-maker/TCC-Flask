import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

function Home() {
  const opacidade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    opacidade.setValue(0);

    const animacao = Animated.timing(opacidade, {
      toValue: 1,
      duration: 3000,
      easing: Easing.ease,
      useNativeDriver: true,
    });

    animacao.start();

    return () => {
      animacao.stop();
    };
  }, [opacidade]);

  return (
    <View style={styles.homeContainer}>
      <Animated.View style={{ opacity: opacidade }}>
        <Text style={styles.welcome}>
          Bem-vindo ao
        </Text>

        <Text style={styles.title}>
          Almoxarifado SENAI
        </Text>
      </Animated.View>
    </View>
  );
}

function CadastroItem() {
  return (
    <View style={styles.center}>
      <Text>Cadastro de Itens</Text>
    </View>
  );
}

function Movimentacao() {
  return (
    <View style={styles.center}>
      <Text>Movimentação</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function HeaderLogo() {
  return (
    <Image
      source={require('../../../assets/senai-logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#ffffff',
            height: 110,
            borderBottomWidth: 4,
            borderBottomColor: '#ff5500',
            elevation: 0,
          },

          headerTitleAlign: 'left',

          headerTitleContainerStyle: {
            left: 5,
          },

          headerTitle: () => <HeaderLogo />,

          // Botão para abrir o menu lateral
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.menuButton}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Abrir menu"
            >
              <Ionicons
                name="menu"
                size={28}
                color="#002A54"
              />
            </TouchableOpacity>
          ),

          drawerStyle: {
            backgroundColor: '#f4f4f9',
            width: 250,
          },

          drawerActiveTintColor: '#00529e',
          drawerInactiveTintColor: '#333333',

          // Permite abrir o menu arrastando a tela
          swipeEnabled: true,
        })}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Início',
            drawerLabel: 'Início',
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="home-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="CadastrodeItens"
          component={CadastroItem}
          options={{
            title: 'Cadastro de Itens',
            drawerLabel: 'Cadastro de Itens',
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="cube-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Movimentação"
          component={Movimentacao}
          options={{
            title: 'Movimentações',
            drawerLabel: 'Movimentações',
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="swap-horizontal-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 130,
    height: 40,
  },

  menuButton: {
    marginLeft: 15,
    padding: 6,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeContainer: {
    flex: 1,
    backgroundColor: '#002A54',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  welcome: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  subtitle: {
    color: '#ffffff',
    fontSize: 17,
    textAlign: 'center',
    opacity: 0.9,
  },
});

registerRootComponent(App);