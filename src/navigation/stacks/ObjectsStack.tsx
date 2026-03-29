import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ObjectsStackParamList } from '../../types';

import StarArchive from '../../screens/objects/StarArchive';
import ObjectDetail from '../../screens/objects/ObjectDetail';
import MyObjects from '../../screens/objects/MyObjects';
import AddObject from '../../screens/objects/AddObject';

const Stack = createNativeStackNavigator<ObjectsStackParamList>();

export default function ObjectsStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="StarArchive"
    >
      <Stack.Screen name="StarArchive" component={StarArchive} />
      <Stack.Screen name="ObjectDetail" component={ObjectDetail} />
      <Stack.Screen name="MyObjects" component={MyObjects} />
      <Stack.Screen name="AddObject" component={AddObject} />
    </Stack.Navigator>
  );
}