import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// components
import {Container} from '../components';

// constants
import {
  FONTS,
  COLORS,
  SIZES,
  icons,
  images,
  normalizeSize,
  GOOGLE_API_KEY,
} from '../constants';

const {width, height} = SIZES;

const OrderDeliveryScreen = ({navigation, route}) => {
  const mapView = useRef();
  const [restaurant, setRestaurant] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [streetName, setStreetName] = useState('');
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [duration, setDuration] = useState();
  const [isReady, setIsReady] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let {restaurant, currentLocation} = route.params;
    setRestaurant(restaurant);
    setCurrentLocation(currentLocation);

    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  const calculateAngle = coordinates => {
    let startLat = coordinates[0]['latitude'];
    let startLng = coordinates[0]['longitude'];
    let endLat = coordinates[1]['latitude'];
    let endLng = coordinates[1]['longitude'];
    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  // destination marker
  const DestinationMarker = () => {
    return (
      <Marker coordinate={toLocation}>
        <View
          style={{
            height: normalizeSize(40),
            width: normalizeSize(40),
            borderRadius: normalizeSize(20),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              height: normalizeSize(30),
              width: normalizeSize(30),
              borderRadius: normalizeSize(15),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              source={icons.pin}
              style={{
                width: normalizeSize(25),
                height: normalizeSize(25),
                tintColor: COLORS.white,
              }}
            />
          </View>
        </View>
      </Marker>
    );
  };

  // delivery person marker
  const DeliveryPersonIcon = () => {
    return (
      <Marker
        coordinate={fromLocation}
        anchor={{x: 0.5, y: 0.5}}
        flat={true}
        rotation={angle}>
        <Image
          source={icons.car}
          style={{
            width: normalizeSize(40),
            height: normalizeSize(40),
          }}
        />
      </Marker>
    );
  };

  // destination header. shows the totoal duration
  const RenderDestinationHeader = () => {
    return (
      <View
        style={{
          position: 'absolute',
          top: normalizeSize(50),
          left: 0,
          right: 0,
          height: normalizeSize(50),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <Image
            source={icons.red_pin}
            style={{
              width: normalizeSize(30),
              height: normalizeSize(30),
              marginRight: SIZES.padding,
            }}
          />

          <View style={{flex: 1}}>
            <Text style={{...FONTS.body3}}>{streetName}</Text>
          </View>

          <Text style={{...FONTS.body3}}>{Math.ceil(duration)}mins</Text>
        </View>
      </View>
    );
  };

  return (
    <Container>
      {/* map */}
      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        initialRegion={region}
        style={{flex: 1}}>
        <MapViewDirections
          origin={fromLocation}
          destination={toLocation}
          apikey={GOOGLE_API_KEY}
          strokeWidth={5}
          strokeColor={COLORS.primary}
          optimizeWaypoints={true}
          onReady={result => {
            setDuration(result.duration);

            if (!isReady) {
              // Fit route into maps
              mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / normalizeSize(20),
                  bottom: height / normalizeSize(4),
                  left: width / normalizeSize(20),
                  top: height / normalizeSize(8),
                },
              });

              // reposition car
              let nextLoc = {
                latitude: result.coordinates[0]['latitude'],
                longitude: result.coordinates[0]['longitude'],
              };

              if (result.coordinates.length >= 2) {
                let angle = calculateAngle(result.coordinates);
                setAngle(angle);
              }

              setFromLocation(nextLoc);
              setIsReady(true);
            }
          }}
        />

        {/* destination marker */}
        {DestinationMarker()}

        {/* delivery person marker */}
        {DeliveryPersonIcon()}
      </MapView>

      {/* render destination header */}
      {RenderDestinationHeader()}
    </Container>
  );
};

const styles = StyleSheet.create({});

export default OrderDeliveryScreen;
