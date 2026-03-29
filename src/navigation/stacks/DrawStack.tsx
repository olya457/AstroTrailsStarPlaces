import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SketchHome from '../../screens/draw/SketchHome';
import DrawCanvas from '../../screens/draw/DrawCanvas';

const Stack = createNativeStackNavigator();

export default function DrawStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SketchHome" component={SketchHome} />
      <Stack.Screen name="DrawCanvas" component={DrawCanvas} />
    </Stack.Navigator>
  );
}