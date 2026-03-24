/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './src/screens/SplashScreen'
import InputScreen from './src/screens/InputScreen'
import TrackingScreen from './src/screens/TrackingScreen.js'



const Stack = createStackNavigator();

class App extends Component {

  render(){



    return(
      <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen name="splash" component={SplashScreen} options={{
         headerShown:false
        }}  />
         <Stack.Screen name="input" component={InputScreen} options={{
         headerShown:false
        }}  />
         <Stack.Screen name="track" component={TrackingScreen} options={{
         headerShown:false
        }}  />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }

}

export default App;
