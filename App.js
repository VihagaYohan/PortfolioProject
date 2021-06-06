/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {StripeProvider} from '@stripe/stripe-react-native';

// screen
import HomeScreen from './app/screens/HomeScreen';

// navigators
import StackNavigator from './app/navigations/AppNavigator';
import BottomTabNavigator from './app/navigations/BottomNavigator';

// store
import store from './app/store/store';

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51Iule3EHwMdMCEQY8bnkfR06hUdCabBYOS33DwSbeACbAO6baUHeGZ43YByINPW8fbuOsiu72ak6Tz5In5orNIfn00AqDCJuSF">
      <Provider store={store}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </Provider>
    </StripeProvider>

    /*   <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </Provider> */
  );
};

const styles = StyleSheet.create({});

export default App;
