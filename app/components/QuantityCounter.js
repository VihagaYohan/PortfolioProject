import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

// components
import {Icon} from '.';

// constants
import {FONTS, SIZES, COLORS, icons, images, normalizeSize} from '../constants';
import {increaseQuantityBy1} from '../store/actions/cart';

const Counter = ({style, quantity, getCount, userValue, menuId}) => {
  const [count, setCount] = useState(userValue);
  const dispatch = useDispatch();

  // increase count
  const increaseCount = count => {
    let currentCount = parseInt(count);
    currentCount = currentCount + 1;

    setCount(currentCount.toString());
    getCount(currentCount); // send updated count to parent container
  };

  // decrease count
  const decreaseCount = count => {
    let currentCount = parseInt(count);
    if (currentCount === 1) return;

    currentCount = currentCount - 1;
    setCount(currentCount.toString());
    getCount(currentCount); // send updated count to parent container
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop:normalizeSize(10)
      }}>
      <TouchableOpacity onPress={() => increaseQuantityBy1(menuId)}>
        <Icon name="md-caret-back-sharp" color={COLORS.primary} />
      </TouchableOpacity>

      <Text
        style={{
          ...FONTS.body3,
          fontSize: normalizeSize(18),
          marginHorizontal: normalizeSize(20),
        }}>
        {count}
      </Text>

      <TouchableOpacity onPress={() => decreaseCount(count)}>
        <Icon name="md-caret-forward-sharp" color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Counter;
