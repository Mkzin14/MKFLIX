import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import MainRoutes from './src/routes/MainRoutes';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}