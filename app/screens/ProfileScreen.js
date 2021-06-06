import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

// componetns
import {Container} from '../components';

// constants
import {SIZES, COLORS, FONTS, icons, images, normalizeSize} from '../constants';

const {width, height} = SIZES;

const ProfileScreen = ({navigation, route}) => {
  return (
    <Container>
      <Text>Profile screen</Text>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
