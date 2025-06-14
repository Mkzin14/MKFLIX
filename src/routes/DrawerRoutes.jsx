import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef();

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Início"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="Início"
        component={TabRoutes}
        options={{ title: 'Página Inicial' }}
      />
      {/* Se quiser adicionar mais rotas no drawer futuramente, só seguir o mesmo padrão */}
    </Drawer.Navigator>
  );
}
