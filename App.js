/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screen/SplashScreen';
import InputScreen from './screen/InputScreen';
import TrackingScreen from './screen/TrackingScreen.js';


const Stack = createStackNavigator();

class App extends Component {

  render(){

    return (
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
      );
    }
};


export default App;
