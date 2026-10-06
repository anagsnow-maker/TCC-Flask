import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

function Home() {
  return (
    <View style={styles.center}>
      <Text>Perfil do Usuário</Text>
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
            height: 70,
            borderBottomWidth: 4,
            borderBottomColor: '#ff5500',
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
            >
              <Ionicons
                name="menu-outline"
                size={24}
                color="#333"
              />
            </TouchableOpacity>
          ),

          drawerStyle: {
            backgroundColor: '#f4f4f9',
            width: 250,
          },

          drawerActiveTintColor: '#00529e',
          drawerInactiveTintColor: '#333',
        })}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ drawerLabel: 'Início' }}
        />

        <Drawer.Screen
          name="CadastrodeItens"
          component={CadastroItem}
          options={{ drawerLabel: 'Cadastro de Itens' }}
        />

        <Drawer.Screen
          name="Movimentação"
          component={Movimentacao}
          options={{ drawerLabel: 'Movimentações' }}
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
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

registerRootComponent(App);