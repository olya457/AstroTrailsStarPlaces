import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ImageBackground, SafeAreaView, Animated,
  Dimensions, Image, Platform,
} from 'react-native';

const { height, width } = Dimensions.get('window');
const IMG_HEIGHT = height * 0.5;

export default function Onboarding1({ navigation }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/onboard_1.png')}
            style={styles.personImage}
            resizeMode="contain"
          />
        </View>
        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.title}>Begin Where the Sky Opens</Text>
          <Text style={styles.desc}>
            Across the world there are places where the night still belongs to the stars.
            Step into remarkable destinations where city lights fade, silence deepens,
            and the universe unfolds above the horizon in breathtaking detail
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => navigation.navigate('Main' as never)}
            >
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Onboarding2')}
            >
              <Text style={styles.nextTxt}>Next  →</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#050510' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  container: { flex: 1, zIndex: 2 },
  imageContainer: {
    width: width,
    height: IMG_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 0,
  },
  personImage: {
    width: width * 0.75,
    height: IMG_HEIGHT,
    marginTop: Platform.OS === 'android' ? 20 : 20,
  },
  content: {
    flex: 1,
    marginTop: -40,
    paddingHorizontal: height < 700 ? 18 : 24,
    paddingBottom: Platform.OS === 'android' ? 60 : 30,
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFFFFF',
    fontSize: height < 700 ? 24 : 30,
    fontWeight: '800',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: height < 700 ? 30 : 38,
    marginBottom: height < 700 ? 10 : 14,
  },
  desc: {
    color: '#D0D0D0',
    fontSize: height < 700 ? 11 : 13,
    textAlign: 'center',
    lineHeight: height < 700 ? 17 : 20,
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 30 : 0,
  },
  skip: {
    color: '#FFFFFF',
    fontSize: height < 700 ? 14 : 16,
  },
  nextBtn: {
    backgroundColor: '#F5C842',
    paddingHorizontal: height < 700 ? 28 : 36,
    paddingVertical: height < 700 ? 12 : 15,
    borderRadius: 30,
  },
  nextTxt: {
    color: '#1A1A1A',
    fontSize: height < 700 ? 14 : 16,
    fontWeight: '700',
  },
});