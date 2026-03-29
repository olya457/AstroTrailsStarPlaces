import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationsStackParamList } from '../../types';

import LocationsList from '../../screens/locations/LocationsList';
import MapViewScreen from '../../screens/locations/MapViewScreen';
import LocationDetail from '../../screens/locations/LocationDetail';

const Stack = createNativeStackNavigator<LocationsStackParamList>();

export default function LocationsStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="LocationsList"
    >
      <Stack.Screen name="LocationsList" component={LocationsList} />
      <Stack.Screen name="MapView" component={MapViewScreen} />
      <Stack.Screen name="LocationDetail" component={LocationDetail} />
    </Stack.Navigator>
  );
}