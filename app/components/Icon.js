import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// constants
import {SIZES, COLORS, normalizeSize} from '../constants';

const Icon = ({
  name,
  size = normalizeSize(20),
  color = COLORS.black,
  onPress,
}) => {
  return <Ionicons name={name} size={size} color={color} onPress={onPress} />;
};

const styles = StyleSheet.create({});

export default Icon;
