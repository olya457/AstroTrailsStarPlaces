import React from 'react';
import { View, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LocationsStack from './stacks/LocationsStack';
import ObjectsStack from './stacks/ObjectsStack';
import ConvertStack from './stacks/ConvertStack';
import StoriesStack from './stacks/StoriesStack';
import DrawStack from './stacks/DrawStack';

const { height } = Dimensions.get('window');
const isSmall = height < 700;
const Tab = createBottomTabNavigator();

const ICONS = {
  Locations: require('../assets/icons/locations.png'),
  Objects:   require('../assets/icons/objects.png'),
  Convert:   require('../assets/icons/convert.png'),
  Stories:   require('../assets/icons/stories.png'),
  Draw:      require('../assets/icons/draw.png'),
};

const TabIcon = ({
  name,
  focused,
}: {
  name: keyof typeof ICONS;
  focused: boolean;
}) => (
  <View style={[ic.wrap, focused && ic.wrapActive]}>
    <Image
      source={ICONS[name]}
      style={[ic.icon, { tintColor: focused ? '#FFB064' : '#444466' }]}
      resizeMode="contain"
    />
  </View>
);

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={bar.container}>
      <View style={bar.pill}>
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const icon = options.tabBarIcon?.({ focused, color: focused ? '#FFB064' : '#444466', size: 24 });

          return (
            <View key={route.key} style={bar.tab}>
              <View
                style={bar.tabInner}
                onStartShouldSetResponder={() => true}
                onResponderRelease={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                }}
              >
                {icon}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Locations"
        component={LocationsStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Locations" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Objects"
        component={ObjectsStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Objects" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Convert"
        component={ConvertStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Convert" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Stories"
        component={StoriesStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Stories" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Draw"
        component={DrawStack}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="Draw" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const PILL_HEIGHT = isSmall ? 58 : 68;
const BOTTOM_OFFSET = Platform.OS === 'ios'
  ? (isSmall ? 24 : 30)
  : 40;

const bar = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: BOTTOM_OFFSET,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: '#0D0D18',
    borderRadius: 32,
    height: PILL_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1.5,
    borderColor: '#FFB064',
    shadowColor: '#FFB064',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 20,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabInner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

const ic = StyleSheet.create({
  wrap: {
    width: isSmall ? 40 : 46,
    height: isSmall ? 34 : 40,
    borderRadius: isSmall ? 10 : 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wrapActive: {
    backgroundColor: 'rgba(255,176,100,0.15)',
    borderWidth: 1,
    borderColor: '#FFB064',
  },
  icon: {
    width: isSmall ? 22 : 26,
    height: isSmall ? 22 : 26,
  },
});