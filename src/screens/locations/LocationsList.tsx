import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, Image, ScrollView,
  Dimensions, ImageBackground, Platform,
} from 'react-native';
import { LOCATIONS } from '../../data/locations';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.55;
const isSmall = height < 700;

export default function LocationsList({ navigation }: any) {
  const [search, setSearch] = useState('');

  const filtered = LOCATIONS.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>
        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'android' ? 160 : 120,
            paddingTop: Platform.OS === 'android' ? 20 : 0,
          }}
          ListHeaderComponent={() => (
            <>
              <View style={s.header}>
                <Text style={s.title}>Star Destinations</Text>
                <Text style={s.sub}>Places on Earth where the night sky feels closer than anywhere else</Text>
              </View>

              <View style={s.tabs}>
                <View style={s.tabActive}>
                  <Text style={s.tabActiveTxt}>Destinations</Text>
                </View>
                <TouchableOpacity
                  style={s.tab}
                  onPress={() => navigation.navigate('MapView')}
                >
                  <Text style={s.tabTxt}>Map View</Text>
                </TouchableOpacity>
              </View>

              <View style={s.searchRow}>
                <Text style={s.searchIcon}>🔍</Text>
                <TextInput
                  style={s.search}
                  placeholder="Search destinations..."
                  placeholderTextColor="#555570"
                  value={search}
                  onChangeText={setSearch}
                />
              </View>

              <Text style={s.section}>Tonight's Stellar Picks</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.picksRow}
              >
                {LOCATIONS.slice(0, 5).map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={s.pickCard}
                    onPress={() => navigation.navigate('LocationDetail', { id: item.id })}
                    activeOpacity={0.85}
                  >
                    <Image source={item.image} style={s.pickImg} resizeMode="cover" />
                    <View style={s.pickOverlay} />
                    <View style={s.pickArrow}>
                      <Text style={s.pickArrowTxt}>↗</Text>
                    </View>
                    <View style={s.pickInfo}>
                      <View style={s.pickBadge}>
                        <Text style={s.pickBadgeTxt}>{item.region}, {item.country}</Text>
                      </View>
                      <Text style={s.pickName} numberOfLines={2}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={s.section}>Star Destinations</Text>
            </>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={s.listItem}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('LocationDetail', { id: item.id })}
            >
              <Image source={item.image} style={s.listImg} resizeMode="cover" />
              <View style={s.listInfo}>
                <Text style={s.listName} numberOfLines={2}>{item.name}</Text>
                <View style={s.listBadge}>
                  <Text style={s.listBadgeTxt}>{item.region}, {item.country}</Text>
                </View>
                <Text style={s.listDesc} numberOfLines={2}>{item.whatYouSee}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

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
  title: {
    color: '#FFF',
    fontSize: isSmall ? 18 : 22,
    fontWeight: '700',
  },
  sub: {
    color: '#888899',
    fontSize: isSmall ? 11 : 13,
    marginTop: 4,
    lineHeight: isSmall ? 16 : 18,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(19,19,31,0.8)',
    borderRadius: 12,
    padding: 4,
    marginBottom: isSmall ? 10 : 14,
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: isSmall ? 12 : 18,
    backgroundColor: 'rgba(19,19,31,0.8)',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  search: {
    flex: 1,
    paddingVertical: isSmall ? 8 : 11,
    color: '#FFF',
    fontSize: isSmall ? 12 : 14,
  },
  section: {
    color: '#FFF',
    fontSize: isSmall ? 14 : 16,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: isSmall ? 8 : 12,
  },
  picksRow: {
    paddingLeft: 20,
    paddingRight: 8,
    gap: 12,
    marginBottom: isSmall ? 16 : 24,
  },
  pickCard: {
    width: CARD_WIDTH,
    height: isSmall ? 160 : 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#13131F',
  },
  pickImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  pickOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  pickArrow: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5C842',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickArrowTxt: {
    color: '#0A0A0F',
    fontSize: 16,
    fontWeight: '700',
  },
  pickInfo: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  pickBadge: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  pickBadgeTxt: {
    color: '#0A0A0F',
    fontSize: 10,
    fontWeight: '700',
  },
  pickName: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  listItem: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: 'rgba(19,19,31,0.85)',
    borderRadius: 14,
    overflow: 'hidden',
  },
  listImg: {
    width: isSmall ? 72 : 88,
    height: isSmall ? 72 : 88,
  },
  listInfo: {
    flex: 1,
    padding: isSmall ? 8 : 10,
  },
  listName: {
    color: '#FFF',
    fontSize: isSmall ? 12 : 13,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 18,
  },
  listBadge: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  listBadgeTxt: {
    color: '#0A0A0F',
    fontSize: 10,
    fontWeight: '700',
  },
  listDesc: {
    color: '#888899',
    fontSize: isSmall ? 10 : 11,
    lineHeight: 16,
  },
});