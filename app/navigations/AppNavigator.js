import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import OrderDeliveryScreen from '../screens/OrderDeliveryScreen'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="OrderDeliveryScreen" component={OrderDeliveryScreen}/>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AppNavigator;
