import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/LoginScreen';
import BottomNavigation from './BottomNavigation';
import SignUp from '../screen/SignUp';
import NewLead from '../screen/NewLead';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="NewLead" component={NewLead} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
