import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import DrawerRoutes from './DrawerRoutes';

const Stack = createNativeStackNavigator();

export default function MainRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      {/* Tela de abertura inicial */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* Navegação principal com Drawer + Tabs */}
      <Stack.Screen name="Principal" component={DrawerRoutes} />
    </Stack.Navigator>
  );
}
