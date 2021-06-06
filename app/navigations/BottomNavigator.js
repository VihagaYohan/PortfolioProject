import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Svg, {Path} from 'react-native-svg';

// screens and navigators
import AppNavigator from './AppNavigator';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

// components
import {Icon} from '../components';

// constants
import {SIZES, FONTS, COLORS, icons, images, normalizeSize} from '../constants';

const BottomTab = createBottomTabNavigator();

const CustomTabBarButton = ({containerStyle, isFloat, children, onPress}) => {
  if (isFloat) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={90}
          height={61}
          viewBox="0 0 90 61">
          <Path
            d="M0 0a38.742 38.742 0 0113 7c5.313 4.4 6.7 8.593 12 13 5.993 4.98 12.987 8 20 8s14.007-3.02 20-8c5.3-4.408 6.687-8.6 12-13a38.742 38.742 0 0113-7v61H0V0z"
            fill="transparent"
            fillRule="evenodd"
          />
        </Svg>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: normalizeSize(-30),
            alignItems: 'center',
            justifyContent: 'center',
            width: normalizeSize(60),
            height: normalizeSize(60),
            borderRadius: normalizeSize(30),
            backgroundColor: COLORS.primary,
            borderWidth: 3,
            borderColor: COLORS.white,
            elevation: 5,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={{
            flex: 1,
            height: 60,
            backgroundColor: COLORS.gray3,
            ...containerStyle,
          }}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: 'transparent',
          borderTopWidth: 3,
          height:
            Platform.OS == 'android' ? normalizeSize(60) : normalizeSize(80),
        },
      }}>
      <BottomTab.Screen
        name="App_Navigator"
        component={AppNavigator}
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={normalizeSize(28)}
              color={focused ? COLORS.primary : COLORS.darkgray}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cart_Screen"
        component={CartScreen}
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              name="cart"
              size={normalizeSize(28)}
              color={focused ? COLORS.white : COLORS.lightGray4}
            />
          ),
          tabBarButton: props => (
            <CustomTabBarButton {...props} isFloat={true} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile_Screen"
        component={ProfileScreen}
        options={{
          headerTitle: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              name="person-sharp"
              size={normalizeSize(28)}
              color={focused ? COLORS.primary : COLORS.darkgray}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
