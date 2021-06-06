import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

// components
import {Container} from '../components/';

// constants
import {SIZES, COLORS, FONTS, icons, images, normalizeSize} from '../constants';
import DetailScreen from './DetailScreen';

const {width, height} = SIZES;

const initialCurrentLocation = {
  streetName: 'Kelaniya',
  gps: {
    latitude: 6.9518,
    longitude: 79.9133,
  },
};

const categoryData = [
  {
    id: 1,
    name: 'Rice',
    icon: icons.rice_bowl,
  },
  {
    id: 2,
    name: 'Noodles',
    icon: icons.noodle,
  },
  {
    id: 3,
    name: 'Hot Dogs',
    icon: icons.hotdog,
  },
  {
    id: 4,
    name: 'Salads',
    icon: icons.salad,
  },
  {
    id: 5,
    name: 'Burgers',
    icon: icons.hamburger,
  },
  {
    id: 6,
    name: 'Pizza',
    icon: icons.pizza,
  },
  {
    id: 7,
    name: 'Snacks',
    icon: icons.fries,
  },
  {
    id: 8,
    name: 'Sushi',
    icon: icons.sushi,
  },
  {
    id: 9,
    name: 'Desserts',
    icon: icons.donut,
  },
  {
    id: 10,
    name: 'Drinks',
    icon: icons.drink,
  },
];

// price rating
const affordable = 1;
const fairPrice = 2;
const expensive = 3;

const restaurantData = [
  {
    id: 1,
    name: 'Crimland Restaurant',
    rating: 4.8,
    categories: [5, 7],
    priceRating: affordable,
    photo: images.burger_restaurant_1,
    duration: '30 - 45 min',
    location: {
      latitude: 6.8649,
      longitude: 79.8997,
    },
    courier: {
      avatar: images.avatar_1,
      name: 'Amy',
    },
    menu: [
      {
        menuId: 1,
        name: 'Crispy Chicken Burger',
        photo: images.crispy_chicken_burger,
        description: 'Burger with crispy chicken, cheese and lettuce',
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: 'Crispy Chicken Burger with Honey Mustard',
        photo: images.honey_mustard_chicken_burger,
        description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: 'Crispy Baked French Fries',
        photo: images.baked_fries,
        description: 'Crispy Baked French Fries',
        calories: 194,
        price: 8,
      },
    ],
  },
  {
    id: 2,
    name: 'Dominos Pizza',
    rating: 4.8,
    categories: [2, 4, 6],
    priceRating: expensive,
    photo: images.pizza_restaurant,
    duration: '15 - 20 min',
    location: {
      latitude: 6.8649,
      longitude: 79.8997,
    },
    courier: {
      avatar: images.avatar_2,
      name: 'Jackson',
    },
    menu: [
      {
        menuId: 4,
        name: 'Hawaiian Pizza',
        photo: images.hawaiian_pizza,
        description: 'Canadian bacon, homemade pizza crust, pizza sauce',
        calories: 250,
        price: 15,
      },
      {
        menuId: 5,
        name: 'Tomato & Basil Pizza',
        photo: images.pizza,
        description:
          'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
        calories: 250,
        price: 20,
      },
      {
        menuId: 6,
        name: 'Tomato Pasta',
        photo: images.tomato_pasta,
        description: 'Pasta with fresh tomatoes',
        calories: 100,
        price: 10,
      },
      {
        menuId: 7,
        name: 'Mediterranean Chopped Salad ',
        photo: images.salad,
        description: 'Finely chopped lettuce, tomatoes, cucumbers',
        calories: 100,
        price: 10,
      },
    ],
  },
  {
    id: 3,
    name: 'Mac Hotdogs',
    rating: 4.8,
    categories: [3],
    priceRating: expensive,
    photo: images.hot_dog_restaurant,
    duration: '20 - 25 min',
    location: {
      latitude: 6.8649,
      longitude: 79.8997,
    },
    courier: {
      avatar: images.avatar_3,
      name: 'James',
    },
    menu: [
      {
        menuId: 8,
        name: 'Chicago Style Hot Dog',
        photo: images.chicago_hot_dog,
        description: 'Fresh tomatoes, all beef hot dogs',
        calories: 100,
        price: 20,
      },
    ],
  },
  {
    id: 4,
    name: 'Kimoto Sushi',
    rating: 4.8,
    categories: [8],
    priceRating: expensive,
    photo: images.japanese_restaurant,
    duration: '10 - 15 min',
    location: {
      latitude: 6.8649,
      longitude: 79.8997,
    },
    courier: {
      avatar: images.avatar_4,
      name: 'Ahmad',
    },
    menu: [
      {
        menuId: 9,
        name: 'Sushi sets',
        photo: images.sushi,
        description: 'Fresh salmon, sushi rice, fresh juicy avocado',
        calories: 100,
        price: 50,
      },
    ],
  },
  {
    id: 5,
    name: 'Cuisine',
    rating: 4.8,
    categories: [1, 2],
    priceRating: affordable,
    photo: images.noodle_shop,
    duration: '15 - 20 min',
    location: {
      latitude: 6.8649,
      longitude: 79.8997,
    },
    courier: {
      avatar: images.avatar_4,
      name: 'Muthu',
    },
    menu: [
      {
        menuId: 10,
        name: 'Kolo Mee',
        photo: images.kolo_mee,
        description: 'Noodles with char siu',
        calories: 200,
        price: 5,
      },
      {
        menuId: 11,
        name: 'Sarawak Laksa',
        photo: images.sarawak_laksa,
        description: 'Vermicelli noodles, cooked prawns',
        calories: 300,
        price: 8,
      },
      {
        menuId: 12,
        name: 'Nasi Lemak',
        photo: images.nasi_lemak,
        description: 'A traditional Malay rice dish',
        calories: 300,
        price: 8,
      },
      {
        menuId: 13,
        name: 'Nasi Briyani with Mutton',
        photo: images.nasi_briyani_mutton,
        description: 'A traditional Indian rice dish with mutton',
        calories: 300,
        price: 8,
      },
    ],
  },
  {
    id: 6,
    name: 'Paradise Dessets',
    rating: 4.9,
    categories: [9, 10],
    priceRating: affordable,
    photo: images.kek_lapis_shop,
    duration: '35 - 40 min',
    location: {
      latitude: 6.8649,
      longitude: 79.8997,
    },
    courier: {
      avatar: images.avatar_1,
      name: 'Jessie',
    },
    menu: [
      {
        menuId: 12,
        name: 'Teh C Peng',
        photo: images.teh_c_peng,
        description: 'Three Layer Teh C Peng',
        calories: 100,
        price: 2,
      },
      {
        menuId: 13,
        name: 'ABC Ice Kacang',
        photo: images.ice_kacang,
        description: 'Shaved Ice with red beans',
        calories: 100,
        price: 3,
      },
      {
        menuId: 14,
        name: 'Kek Lapis',
        photo: images.kek_lapis,
        description: 'Layer cakes',
        calories: 300,
        price: 20,
      },
    ],
  },
];

const HomeScreen = ({navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);

  const onSelectedCategory = category => {
    // filter restaurants
    let restaurantList = restaurantData.filter(a =>
      a.categories.includes(category.id),
    );
    setRestaurants(restaurantList);
    setSelectedCategory(category);
  };

  const getCategoryNameById = id => {
    let category = categories.filter(a => a.id == id);

    if (category.length > 0) return category[0].name;

    return '';
  };

  // render header
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
          }}>
          {/* <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          /> */}
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
            <Text style={{...FONTS.h3}}>{currentLocation.streetName}</Text>
          </View>
        </View>

        {/* location icon */}
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}></TouchableOpacity>
      </View>
    );
  };

  // render main categories
  const RenderMainCategories = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectedCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.primary
                  : COLORS.lightGray,
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: normalizeSize(30),
                height: normalizeSize(30),
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body4,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Text
          style={{
            ...FONTS.h1,
          }}>
          Delicious Foods
        </Text>

        <Text
          style={{
            ...FONTS.h1,
          }}>
          For You
        </Text>

        {/* category list */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 2,
          }}
        />
      </View>
    );
  };

  // render restaurant list
  const RenderRestaurantList = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.padding * 2,
          }}
          onPress={() =>
            navigation.navigate('DetailScreen', {
              item,
              currentLocation,
            })
          }>
          {/* image */}
          <View style={{marginBottom: SIZES.padding}}>
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{
                width: '100%',
                height: normalizeSize(200),
                borderRadius: SIZES.radius,
              }}
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow,
              }}>
              <Text style={{...FONTS.h4}}>{item.duration}</Text>
            </View>
          </View>

          {/* restaurant info */}
          <Text style={{...FONTS.body2}}>{item.name}</Text>

          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row',
            }}>
            {/* rating  */}
            <Image
              source={icons.star}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: normalizeSize(10),
              }}
            />
            <Text style={{...FONTS.body3}}>{item.rating}</Text>

            {/* categories */}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: normalizeSize(10),
              }}>
              {item.categories.map(categoryId => {
                return (
                  <View style={{flexDirection: 'row'}} key={categoryId}>
                    <Text style={{...FONTS.body3}}>
                      {getCategoryNameById(categoryId)}
                    </Text>
                    <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                      {' '}
                      .
                    </Text>
                  </View>
                );
              })}

              {/* price */}
              {[1, 2, 3].map(priceRating => (
                <Text
                  key={priceRating}
                  style={{
                    ...FONTS.body3,
                    color:
                      priceRating <= item.priceRating
                        ? COLORS.black
                        : COLORS.darkgray,
                  }}>
                  ${item.priceRating}
                </Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        data={restaurants}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  };

  return (
    <Container>
      {/* header component */}
      {RenderHeader()}

      {/* main categories */}
      {RenderMainCategories()}

      {/* render restaurant list */}
      {RenderRestaurantList()}
    </Container>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
  },
});

export default HomeScreen;
