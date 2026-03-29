import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoriesStackParamList } from '../../types';

import CosmicKnowledge from '../../screens/stories/CosmicKnowledge';
import ArticleRead from '../../screens/stories/ArticleRead';
import QuizScreen from '../../screens/stories/QuizScreen';
import QuizResult from '../../screens/stories/QuizResult';

const Stack = createNativeStackNavigator<StoriesStackParamList>();

export default function StoriesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CosmicKnowledge" component={CosmicKnowledge} />
      <Stack.Screen name="ArticleRead" component={ArticleRead} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="QuizResult" component={QuizResult} />
    </Stack.Navigator>
  );
}