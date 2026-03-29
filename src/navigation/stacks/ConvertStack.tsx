import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DistanceLab from '../../screens/convert/DistanceLab';

const Stack = createNativeStackNavigator();

export default function ConvertStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DistanceLab" component={DistanceLab} />
    </Stack.Navigator>
  );
}