import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// components
import {Container} from '../components';

// constants
import {SIZES, COLORS, FONTS, icons, images, normalizeSize} from '../constants';

const {width, height} = SIZES;

const DetailScreen = ({navigation, route}) => {
  const [restaurant, setRestaurant] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, []);

  const RenderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
        }}>
        {/* location icon */}
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        {/* location field */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>
          </View>
        </View>

        {/* location icon */}
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          {/*  <Image
            source={icons.list}
            resizeMode="contain"
            style={{
              width: normalizeSize(30),
              height: normalizeSize(30),
            }}
          /> */}
        </TouchableOpacity>
      </View>
    );
  };

  const RenderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {restaurant?.menu.map((item, index) => (
          <View key={`menu-${index}`} style={{alignItems: 'center'}}>
            <View
              style={{
                height: height * 0.35,
              }}>
              {/* food image */}
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{
                  width: width,
                  height: '100%',
                }}
              />

              {/* quantity */}
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: width,
                  height: normalizeSize(50),
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: normalizeSize(50),
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: normalizeSize(25),
                    borderBottomLeftRadius: normalizeSize(25),
                  }}>
                  <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: normalizeSize(50),
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{...FONTS.h2}}>5</Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: normalizeSize(50),
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: normalizeSize(25),
                    borderBottomRightRadius: normalizeSize(25),
                  }}>
                  <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* name and description*/}
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: normalizeSize(15),
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={{
                  marginVertical: normalizeSize(10),
                  textAlign: 'center',
                  ...FONTS.h2,
                }}>
                {item.name} - {item.price.toFixed(2)}
              </Text>
              <Text style={{...FONTS.body3}}>{item.description}</Text>
            </View>

            {/* calaroies */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalizeSize(10),
              }}>
              <Image
                source={icons.fire}
                style={{
                  width: normalizeSize(20),
                  height: normalizeSize(20),
                  marginRight: normalizeSize(10),
                }}
              />
              <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                {item.calories.toFixed(2)} cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  const RenderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View style={{height: normalizeSize(30)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {restaurant?.menu.map((item, index) => {
            const opactiry = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opactiry={opactiry}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: normalizeSize(6),
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const RenderOrder = () => {
    return (
      <View>
        {RenderDots()}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: normalizeSize(40),
            borderTopLeftRadius: normalizeSize(40),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}>
            <Text style={{...FONTS.h3}}>Items In Cart</Text>
            <Text style={{...FONTS.h3}}>$45.00</Text>
          </View>

          {/* order button */}
          <TouchableOpacity
            style={{
              padding: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}
              onPress={() =>
                navigation.navigate('OrderDeliveryScreen', {
                  restaurant,
                  currentLocation,
                })
              }>
              <Text style={{...FONTS.h2, color: COLORS.white}}>Order Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <ScrollView
        style={{
          width: SIZES.width,
          height: SIZES.height,
        }}
        showsVerticalScrollIndicator={false}>
        {/* render header  */}
        {RenderHeader()}

        {/* render food info */}
        {RenderFoodInfo()}

        {/* render order */}
        {RenderOrder()}
        <View
          style={{
            width: 500,
            height: 500,
          }}></View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default DetailScreen;
