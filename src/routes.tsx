import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './Navigators/DrawerNavigator';
import CartPage from './Pages/CartPage';
import Login from './Pages/LoginPage';
import SingUp from './Pages/SingUpPage';
import FinishOrder from './Pages/FinishOrderPage';


const Stack = createNativeStackNavigator()

const Routes = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
          {
            headerShown: false
          }
        }>
        <Stack.Screen name='DrawerNavigator' component={DrawerNavigator}/>
        <Stack.Screen name='Cart' component={CartPage}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SingUp" component={SingUp}/>
        <Stack.Screen name="FinishOrder" component={FinishOrder}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Routes;
