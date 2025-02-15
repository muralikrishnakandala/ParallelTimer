import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import AddTimer from './src/screens/AddTimer';

export type RootStackParamList = {
  Home: undefined; 
  AddTimer: undefined;
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTimer" component={AddTimer} />
        <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )

}


export default App;
