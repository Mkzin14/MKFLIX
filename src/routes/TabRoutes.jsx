import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import FilmesFavoritos from '../screens/FilmesFavoritos';
import PerfilUsuario from '../screens/PerfilUsuario';
import MinhasAvaliacoes from '../screens/AgendaFilmes';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          switch (route?.name) {  // ✅ Proteção aqui
            case 'Início':
              icon = 'home';
              break;
            case 'Favoritos':
              icon = 'favorite';
              break;
            case 'Avaliações':
              icon = 'rate-review';
              break;
            case 'Usuário':
              icon = 'person';
              break;
            default:
              icon = 'help-outline';  // ✅ Ícone padrão se não tiver nome
          }
          return <MaterialIcons name={icon} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Favoritos" component={FilmesFavoritos} />
      <Tab.Screen name="Agenda" component={MinhasAvaliacoes} />
      <Tab.Screen name="Usuário" component={PerfilUsuario} />
    </Tab.Navigator>
  );
}