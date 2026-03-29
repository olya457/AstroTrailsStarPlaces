import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, Image, Dimensions,
  Share, ImageBackground, Platform,
} from 'react-native';
import { LOCATIONS } from '../../data/locations';

const { width, height } = Dimensions.get('window');
const isSmall = height < 700;

export default function LocationDetail({ navigation, route }: any) {
  const location = LOCATIONS.find(l => l.id === route.params?.id) ?? LOCATIONS[0];

  const handleShare = async () => {
    try {
      await Share.share({
        title: location.name,
        message: `${location.name}\n${location.region}, ${location.country}\n\n${location.whatYouSee}\n\n${location.whySpecial}`,
      });
    } catch {}
  };

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'android' ? 160 : 80,
            paddingTop: Platform.OS === 'android' ? 20 : 0,
          }}
        >
          <View style={s.headerRow}>
            <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
              <Text style={s.backArrow}>←</Text>
            </TouchableOpacity>
            <View style={s.headerText}>
              <Text style={s.title}>{location.name}</Text>
              <Text style={s.region}>{location.region}, {location.country}</Text>
            </View>
          </View>

          <Image
            source={location.image}
            style={s.hero}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={s.mapBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('MapView')}
          >
            <Text style={s.mapBtnTxt}>Show on Map</Text>
          </TouchableOpacity>

          <View style={s.section}>
            <Text style={s.sectionYellow}>What You Can See Here</Text>
            <Text style={s.body}>{location.whatYouSee}</Text>
          </View>

          <View style={s.section}>
            <Text style={s.body}>{location.cosmicStory}</Text>
          </View>

          <View style={s.section}>
            <Text style={s.sectionYellowItalic}>Why This Place Is Special</Text>
            <Text style={s.bodyItalic}>{location.whySpecial}</Text>
          </View>

          <TouchableOpacity style={s.shareBtn} onPress={handleShare}>
            <Text style={s.shareBtnTxt}>Share ↗</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: isSmall ? 8 : 12,
    gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(19,19,31,0.8)',
    justifyContent: 'center', alignItems: 'center',
  },
  backArrow: { color: '#FFF', fontSize: 18 },
  headerText: { flex: 1 },
  title: { color: '#FFF', fontSize: isSmall ? 14 : 17, fontWeight: '700', lineHeight: isSmall ? 20 : 22 },
  region: { color: '#F5C842', fontSize: isSmall ? 11 : 12, marginTop: 2 },
  hero: {
    width: width - 32,
    height: isSmall ? 160 : 220,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  mapBtn: {
    backgroundColor: '#F5C842',
    marginHorizontal: 16,
    borderRadius: 28,
    paddingVertical: isSmall ? 12 : 15,
    alignItems: 'center',
    marginBottom: isSmall ? 16 : 24,
  },
  mapBtnTxt: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 14 : 16 },
  section: { paddingHorizontal: 20, marginBottom: isSmall ? 14 : 20 },
  sectionYellow: {
    color: '#F5C842', fontSize: isSmall ? 13 : 15,
    fontWeight: '700', marginBottom: isSmall ? 6 : 10,
  },
  sectionYellowItalic: {
    color: '#F5C842', fontSize: isSmall ? 13 : 15,
    fontWeight: '700', fontStyle: 'italic', marginBottom: isSmall ? 6 : 10,
  },
  body: { color: '#B0B0C8', fontSize: isSmall ? 12 : 13, lineHeight: isSmall ? 19 : 22 },
  bodyItalic: { color: '#B0B0C8', fontSize: isSmall ? 12 : 13, lineHeight: isSmall ? 19 : 22, fontStyle: 'italic' },
  shareBtn: {
    marginHorizontal: 16,
    marginTop: isSmall ? 8 : 12,
    backgroundColor: '#F5C842',
    paddingVertical: isSmall ? 13 : 15,
    borderRadius: 28,
    alignItems: 'center',
  },
  shareBtnTxt: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 14 : 16 },
});