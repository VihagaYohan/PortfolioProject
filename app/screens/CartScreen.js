import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {presentPaymentSheet, useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';

// componetns
import {Container, QuantityCounter} from '../components';

// constants
import {SIZES, COLORS, FONTS, icons, images, normalizeSize} from '../constants';

// redux
import {increaseQuantityBy1, decreaseQuantityBy1} from '../store/actions/cart';

// API
import baseURL from '../api/baseURL';

const {width, height} = SIZES;

const CartScreen = ({navigation, route}) => {
  const data = useSelector(state => state.cart); // get redux state for cart
  const [quantity, setQuantity] = useState();
  const [clientSecret, setClientSecret] = useState();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  // getting user quantity from child component (Quantity component)
  const getQuantity = quantity => {
    setQuantity(quantity);
  };

  // initialize payment sheet
  const fetchPaymentIntent = async () => {
    try {
      const response = await axios.post(baseURL + '/api/payments/', {
        amount: 1250 * 100,
      });
      console.log(response.data);
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  // initialize stripe paymetn operation
  const initializePaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });

    console.log('sucess');
    console.log(error)
    if (!error) {
      console.log('initialize payment')
    }
  };

  // open stripe payment sheet
  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet({clientSecret});


    if (error) {
      console.log(error);
    } else {
      alert('Sucess :' + 'Your order is sucessed');
    }
  };

  // useEffect
  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  useEffect(() => {
    if (clientSecret) {
      initializePaymentSheet();
    }
  }, [clientSecret]);

  return (
    <Container
      style={{
        paddingHorizontal: normalizeSize(10),
        paddingVertical: normalizeSize(10),
      }}>
      {/* render only if there are no items in the cart */}
      {data.cart.length === 0 && (
        <Text
          style={{
            ...FONTS.body5,
          }}>
          There are no items in the cart
        </Text>
      )}

      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.darkgray,
          marginBottom: normalizeSize(15),
        }}>
        There are {data.cart.length} items in your cart
      </Text>

      {/* order items */}
      <View
        style={{
          height: '50%',
        }}>
        <FlatList
          data={data.cart}
          keyExtractor={i => i.menuId.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: width - normalizeSize(20),
                  height: width * 0.3,
                  marginBottom: normalizeSize(10),
                  flexDirection: 'row',
                  overflow: 'hidden',
                  backgroundColor: COLORS.white,
                  borderRadius: normalizeSize(15),
                  elevation: 5,
                }}>
                {/* item image */}
                <Image
                  style={{
                    width: '30%',
                    height: '100%',
                  }}
                  source={item.photo}
                />

                {/* item content container */}
                <View
                  style={{
                    flex: 1,

                    marginLeft: normalizeSize(10),
                  }}>
                  {/* item name */}
                  <Text
                    style={{
                      ...FONTS.body3,
                      fontFamily: 'Roboto-Black',
                      fontSize: normalizeSize(18),
                    }}>
                    {item.name}
                  </Text>

                  {/* quantity counter */}
                  <QuantityCounter
                    getCount={getQuantity.bind(this)}
                    userValue={item.quantity}
                    menuId={item.menuId}
                  />

                  {/* number of items and unit price */}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: normalizeSize(10),
                    }}>
                    <Text
                      style={{
                        ...FONTS.body3,
                        marginHorizontal: normalizeSize(5),
                      }}>
                      {item.quantity}
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body3,
                        marginHorizontal: normalizeSize(5),
                      }}>
                      X
                    </Text>
                    <Text
                      style={{
                        ...FONTS.body3,
                        marginHorizontal: normalizeSize(5),
                        color: COLORS.primary,
                        fontFamily: 'Roboto-Black',
                      }}>
                      Rs.{item.price.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      {/* order button */}
      <TouchableOpacity
        style={{
          paddingVertical: normalizeSize(15),
          borderRadius: normalizeSize(20),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.primary,
          marginTop: normalizeSize(20),
        }}
        onPress={() => openPaymentSheet()}>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.white,
            fontSize: normalizeSize(20),
          }}>
          Place Order Rs. {data.cartTotal.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
