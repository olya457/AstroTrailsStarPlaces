import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, ImageBackground, Dimensions, Platform,
} from 'react-native';
import { OBJECTS } from '../../data/objects';

const { height } = Dimensions.get('window');
const isSmall = height < 700;

export default function StarArchive({ navigation }: any) {
  const [search, setSearch] = useState('');

  const filtered = OBJECTS.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ImageBackground source={require('../../assets/splash_bg.png')} style={s.bg} resizeMode="cover">
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>
        <View style={[s.header, Platform.OS === 'android' && s.headerAndroid]}>
          <Text style={s.title}>Cosmic Objects</Text>
          <Text style={s.sub}>Stars, nebulae, galaxies and the wonders that fill the night sky.</Text>
        </View>

        <View style={s.tabs}>
          <View style={s.tabActive}>
            <Text style={s.tabActiveTxt}>Star Archive</Text>
          </View>
          <TouchableOpacity style={s.tab} onPress={() => navigation.navigate('MyObjects')}>
            <Text style={s.tabTxt}>My Objects</Text>
          </TouchableOpacity>
        </View>

        <View style={s.searchRow}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.search}
            placeholder="Search objects..."
            placeholderTextColor="#555570"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'android' ? 160 : 100,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={s.item}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ObjectDetail', { id: item.id })}
            >
              <View style={[s.iconWrap, { backgroundColor: item.color }]}>
                <Text style={s.emoji}>{item.emoji}</Text>
              </View>
              <View style={s.itemInfo}>
                <Text style={s.itemName}>{item.name}</Text>
                <Text style={s.itemType}>{item.type}</Text>
                <Text style={s.itemDesc} numberOfLines={2}>{item.cosmicStory}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity style={s.fab} onPress={() => navigation.navigate('MyObjects')}>
          <Text style={s.fabTxt}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: isSmall ? 10 : 16,
    paddingBottom: 8,
  },
  headerAndroid: {
    paddingTop: (isSmall ? 10 : 16) + 20,
  },
  title: { color: '#FFF', fontSize: isSmall ? 18 : 22, fontWeight: '700' },
  sub: { color: '#888899', fontSize: isSmall ? 11 : 13, marginTop: 4, lineHeight: isSmall ? 16 : 18 },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(19,19,31,0.8)',
    borderRadius: 12,
    padding: 4,
    marginBottom: isSmall ? 10 : 14,
    marginTop: isSmall ? 8 : 12,
  },
  tab: { flex: 1, paddingVertical: isSmall ? 7 : 9, borderRadius: 9, alignItems: 'center' },
  tabActive: { flex: 1, backgroundColor: '#F5C842', paddingVertical: isSmall ? 7 : 9, borderRadius: 9, alignItems: 'center' },
  tabTxt: { color: '#888899', fontSize: isSmall ? 12 : 14, fontWeight: '600' },
  tabActiveTxt: { color: '#0A0A0F', fontSize: isSmall ? 12 : 14, fontWeight: '700' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: isSmall ? 10 : 14,
    backgroundColor: 'rgba(19,19,31,0.8)',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  search: { flex: 1, paddingVertical: isSmall ? 8 : 11, color: '#FFF', fontSize: isSmall ? 12 : 14 },
  item: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(19,19,31,0.85)',
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
  },
  iconWrap: { width: isSmall ? 64 : 72, height: isSmall ? 64 : 72, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: isSmall ? 26 : 30 },
  itemInfo: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  itemName: { color: '#FFF', fontSize: isSmall ? 13 : 14, fontWeight: '700', marginBottom: 2 },
  itemType: { color: '#F5C842', fontSize: isSmall ? 10 : 11, marginBottom: 4 },
  itemDesc: { color: '#888899', fontSize: isSmall ? 10 : 11, lineHeight: 15 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: Platform.OS === 'android' ? 112 : 42,
    width: isSmall ? 46 : 52,
    height: isSmall ? 46 : 52,
    borderRadius: isSmall ? 23 : 26,
    backgroundColor: '#F5C842',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabTxt: { color: '#0A0A0F', fontSize: 28, lineHeight: 32 },
});