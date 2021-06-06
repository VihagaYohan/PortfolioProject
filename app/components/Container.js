import React, {Component} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';

const Container = ({style,children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.childrenContainer, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
  },
});

export default Container;