import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Image, Dimensions,
  ImageBackground, Share, Platform, ScrollView,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { LOCATIONS } from '../../data/locations';

const { width, height } = Dimensions.get('window');
const isSmall = height < 700;

type Location = typeof LOCATIONS[0];

export default function MapViewScreen({ navigation }: any) {
  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] = useState<Location | null>(null);

  const handleShare = async (loc: Location) => {
    try {
      await Share.share({
        title: loc.name,
        message: `${loc.name}\n${loc.region}, ${loc.country}\n\n${loc.whatYouSee}`,
      });
    } catch {}
  };

  const zoomIn = () => {
    mapRef.current?.getCamera().then(cam => {
      mapRef.current?.animateCamera({
        ...cam,
        altitude: (cam.altitude ?? 1000000) / 2,
        zoom: Platform.OS === 'android' ? (cam.zoom ?? 5) + 1 : undefined,
      });
    });
  };

  const zoomOut = () => {
    mapRef.current?.getCamera().then(cam => {
      mapRef.current?.animateCamera({
        ...cam,
        altitude: (cam.altitude ?? 1000000) * 2,
        zoom: Platform.OS === 'android' ? (cam.zoom ?? 5) - 1 : undefined,
      });
    });
  };

  const goToWorld = () => {
    mapRef.current?.animateToRegion({
      latitude: 20,
      longitude: 10,
      latitudeDelta: 100,
      longitudeDelta: 100,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>
        <View style={[s.header, Platform.OS === 'android' && s.headerAndroid]}>
          <Text style={s.title}>Star Destinations</Text>
          <View style={s.tabs}>
            <TouchableOpacity
              style={s.tab}
              onPress={() => navigation.goBack()}
            >
              <Text style={s.tabTxt}>Destinations</Text>
            </TouchableOpacity>
            <View style={s.tabActive}>
              <Text style={s.tabActiveTxt}>Map View</Text>
            </View>
          </View>
        </View>

        <View style={[s.mapContainer, Platform.OS === 'android' && s.mapContainerAndroid]}>
          <MapView
            ref={mapRef}
            style={s.map}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            initialRegion={{
              latitude: 20,
              longitude: 10,
              latitudeDelta: 100,
              longitudeDelta: 100,
            }}
            mapType="standard"
            onPress={() => setSelected(null)}
          >
            {LOCATIONS.map(loc => (
              <Marker
                key={loc.id}
                coordinate={{
                  latitude: loc.coordinates.lat,
                  longitude: loc.coordinates.lng,
                }}
                onPress={(e) => {
                  e.stopPropagation();
                  setSelected(loc);
                }}
              />
            ))}
          </MapView>

          <View style={s.mapControls}>
            <TouchableOpacity style={s.controlBtn} onPress={zoomIn}>
              <Text style={s.controlTxt}>+</Text>
            </TouchableOpacity>
            <View style={s.controlDivider} />
            <TouchableOpacity style={s.controlBtn} onPress={zoomOut}>
              <Text style={s.controlTxt}>−</Text>
            </TouchableOpacity>
            <View style={s.controlSpacer} />
            <TouchableOpacity style={s.controlBtn} onPress={goToWorld}>
              <Text style={s.controlTxt}>◎</Text>
            </TouchableOpacity>
          </View>

          {selected && (
            <>
              <TouchableOpacity
                style={s.popupBackdrop}
                activeOpacity={1}
                onPress={() => setSelected(null)}
              />
              <View style={s.popupCenter}>
                <Image
                  source={selected.image}
                  style={s.popupHero}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={s.popupClose}
                  onPress={() => setSelected(null)}
                >
                  <Text style={s.popupCloseTxt}>✕</Text>
                </TouchableOpacity>
                <View style={s.popupBody}>
                  <View style={s.popupBadge}>
                    <Text style={s.popupBadgeTxt}>
                      {selected.region}, {selected.country}
                    </Text>
                  </View>
                  <Text style={s.popupName} numberOfLines={2}>
                    {selected.name}
                  </Text>
                  <Text style={s.popupDesc} numberOfLines={3}>
                    {selected.whatYouSee}
                  </Text>
                  <View style={s.popupBtns}>
                    <TouchableOpacity
                      style={s.popupShareBtn}
                      onPress={() => handleShare(selected)}
                    >
                      <Text style={s.popupShareTxt}>↗  Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.popupOpenBtn}
                      onPress={() => {
                        setSelected(null);
                        navigation.navigate('LocationDetail', { id: selected.id });
                      }}
                    >
                      <Text style={s.popupOpenTxt}>Open →</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const POPUP_WIDTH = width * 0.85;

const s = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: isSmall ? 10 : 16,
    paddingBottom: isSmall ? 8 : 12,
  },
  headerAndroid: {
    paddingTop: (isSmall ? 10 : 16) + 20,
  },
  title: {
    color: '#FFF',
    fontSize: isSmall ? 18 : 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(19,19,31,0.8)',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: isSmall ? 7 : 9,
    borderRadius: 9,
    alignItems: 'center',
  },
  tabActive: {
    flex: 1,
    backgroundColor: '#F5C842',
    paddingVertical: isSmall ? 7 : 9,
    borderRadius: 9,
    alignItems: 'center',
  },
  tabTxt: {
    color: '#888899',
    fontSize: isSmall ? 12 : 14,
    fontWeight: '600',
  },
  tabActiveTxt: {
    color: '#0A0A0F',
    fontSize: isSmall ? 12 : 14,
    fontWeight: '700',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapContainerAndroid: {
    marginBottom: 100,
  },
  map: { flex: 1 },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -80 }],
    backgroundColor: 'rgba(10,10,18,0.85)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  controlBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlTxt: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '300',
  },
  controlDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  controlSpacer: { height: 8 },
  popupBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  popupCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: POPUP_WIDTH,
    transform: [
      { translateX: -(POPUP_WIDTH / 2) },
      { translateY: isSmall ? -160 : -200 },
    ],
    backgroundColor: '#0D0D1A',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  popupHero: {
    width: '100%',
    height: isSmall ? 140 : 180,
  },
  popupClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupCloseTxt: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  popupBody: {
    padding: isSmall ? 12 : 16,
  },
  popupBadge: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  popupBadgeTxt: {
    color: '#0A0A0F',
    fontSize: 10,
    fontWeight: '700',
  },
  popupName: {
    color: '#FFF',
    fontSize: isSmall ? 14 : 16,
    fontWeight: '700',
    lineHeight: isSmall ? 20 : 22,
    marginBottom: 8,
  },
  popupDesc: {
    color: '#888899',
    fontSize: isSmall ? 11 : 12,
    lineHeight: isSmall ? 16 : 18,
    marginBottom: isSmall ? 12 : 16,
  },
  popupBtns: {
    flexDirection: 'row',
    gap: 10,
  },
  popupShareBtn: {
    flex: 1,
    paddingVertical: isSmall ? 10 : 12,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5C842',
    backgroundColor: 'rgba(245,200,66,0.1)',
  },
  popupShareTxt: {
    color: '#F5C842',
    fontWeight: '700',
    fontSize: isSmall ? 13 : 14,
  },
  popupOpenBtn: {
    flex: 1,
    backgroundColor: '#F5C842',
    paddingVertical: isSmall ? 10 : 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  popupOpenTxt: {
    color: '#0A0A0F',
    fontWeight: '700',
    fontSize: isSmall ? 13 : 14,
  },
});