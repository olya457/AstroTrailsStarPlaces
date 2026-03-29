import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ImageBackground, Dimensions,
  FlatList, Image, Modal, Share, Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LOCATIONS } from '../../data/locations';
import { sketchStore, Sketch } from '../../store/sketchStore';

const { height, width } = Dimensions.get('window');
const isSmall = height < 700;
const CARD_SIZE = (width - 60) / 2;

export default function SketchHome({ navigation }: any) {
  const [tab, setTab] = useState<'start' | 'my'>('start');
  const [sketches, setSketches] = useState<Sketch[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      sketchStore.load().then(() => {
        setSketches(sketchStore.getAll());
      });
      const unsubscribe = sketchStore.subscribe(() => {
        setSketches(sketchStore.getAll());
      });
      return unsubscribe;
    }, [])
  );

  const confirmDelete = async () => {
    if (!deleteId) return;
    await sketchStore.delete(deleteId);
    setDeleteId(null);
  };

  const locationImages = LOCATIONS.slice(0, 8);

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>

        <View style={[s.header, Platform.OS === 'android' && s.headerAndroid]}>
          <Text style={s.title}>Sketch the Stars</Text>
          <Text style={s.sub}>Draw how you imagine a place where the night sky feels infinite</Text>
        </View>

        <View style={s.tabs}>
          <TouchableOpacity
            style={[s.tab, tab === 'start' && s.tabActive]}
            onPress={() => setTab('start')}
          >
            <Text style={[s.tabTxt, tab === 'start' && s.tabActiveTxt]}>Start Drawing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.tab, tab === 'my' && s.tabActive]}
            onPress={() => setTab('my')}
          >
            <Text style={[s.tabTxt, tab === 'my' && s.tabActiveTxt]}>My Sketches</Text>
          </TouchableOpacity>
        </View>

        {tab === 'start' ? (
          <FlatList
            data={locationImages}
            keyExtractor={i => i.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              s.grid,
              { paddingBottom: Platform.OS === 'android' ? 160 : 120 },
            ]}
            columnWrapperStyle={s.gridRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={s.gridCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('DrawCanvas', { location: item })}
              >
                <Image source={item.image} style={s.gridImg} resizeMode="cover" />
                <TouchableOpacity
                  style={s.sketchBtn}
                  onPress={() => navigation.navigate('DrawCanvas', { location: item })}
                >
                  <Text style={s.sketchBtnTxt}>Sketch</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            data={sketches}
            keyExtractor={i => i.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              s.grid,
              { paddingBottom: Platform.OS === 'android' ? 160 : 120 },
            ]}
            columnWrapperStyle={s.gridRow}
            ListEmptyComponent={() => (
              <View style={s.emptyWrap}>
                <Text style={s.emptyEmoji}>✏️</Text>
                <Text style={s.emptyTitle}>No Sketches Yet</Text>
                <Text style={s.emptySub}>Start drawing to see your sketches here</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <View style={s.myCard}>
                <Image source={{ uri: item.uri }} style={s.myCardImg} resizeMode="cover" />
                <Text style={s.myCardName} numberOfLines={1}>{item.locationName}</Text>
                <View style={s.myCardBtns}>
                  <TouchableOpacity
                    style={s.shareCardBtn}
                    onPress={async () => {
                      try {
                        await Share.share({
                          message: `Check out my star sketch from ${item.locationName}! 🌌`,
                        });
                      } catch {}
                    }}
                  >
                    <Text style={s.shareCardTxt}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={s.deleteCardBtn}
                    onPress={() => setDeleteId(item.id)}
                  >
                    <Text style={s.deleteCardTxt}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        <Modal visible={!!deleteId} transparent animationType="fade">
          <View style={s.modalOverlay}>
            <View style={s.modal}>
              <Text style={s.modalTitle}>Delete This Sketch?</Text>
              <Text style={s.modalSub}>Are you sure? This action cannot be undone.</Text>
              <View style={s.modalBtns}>
                <TouchableOpacity onPress={() => setDeleteId(null)}>
                  <Text style={s.stayTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmDelete}>
                  <Text style={s.leaveTxt}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
  sub: { color: '#888899', fontSize: isSmall ? 11 : 13, marginTop: 4, lineHeight: 18 },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(19,19,31,0.8)',
    borderRadius: 12,
    padding: 4,
    marginBottom: isSmall ? 10 : 14,
    marginTop: isSmall ? 8 : 10,
  },
  tab: { flex: 1, paddingVertical: isSmall ? 7 : 9, borderRadius: 9, alignItems: 'center' },
  tabActive: { backgroundColor: '#F5C842' },
  tabTxt: { color: '#888899', fontSize: isSmall ? 12 : 14, fontWeight: '600' },
  tabActiveTxt: { color: '#0A0A0F' },
  grid: {
    paddingHorizontal: 20,
  },
  gridRow: { gap: 16, marginBottom: 16 },
  gridCard: {
    width: CARD_SIZE,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#13131F',
  },
  gridImg: {
    width: '100%',
    height: isSmall ? 110 : 130,
  },
  sketchBtn: {
    backgroundColor: '#F5C842',
    paddingVertical: isSmall ? 8 : 10,
    alignItems: 'center',
  },
  sketchBtnTxt: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 13 : 14 },
  myCard: {
    width: CARD_SIZE,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#13131F',
  },
  myCardImg: {
    width: '100%',
    height: isSmall ? 110 : 130,
    backgroundColor: '#E8E8E8',
  },
  myCardName: { color: '#888899', fontSize: 10, paddingHorizontal: 8, paddingTop: 4 },
  myCardBtns: { flexDirection: 'row', gap: 4, padding: 6 },
  shareCardBtn: {
    flex: 1,
    backgroundColor: '#F5C842',
    paddingVertical: isSmall ? 7 : 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareCardTxt: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 12 : 13 },
  deleteCardBtn: {
    width: 32,
    height: isSmall ? 29 : 32,
    borderRadius: 8,
    backgroundColor: 'rgba(224,85,85,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(224,85,85,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteCardTxt: { color: '#E05555', fontSize: 13 },
  emptyWrap: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  emptySub: { color: '#888899', fontSize: 13, textAlign: 'center', lineHeight: 19 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#0D0D1A', borderRadius: 20, padding: 24, width: 280, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  modalTitle: { color: '#FFF', fontSize: 17, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  modalSub: { color: '#888899', fontSize: 13, textAlign: 'center', marginBottom: 20, lineHeight: 18 },
  modalBtns: { flexDirection: 'row', justifyContent: 'space-around' },
  stayTxt: { color: '#888899', fontSize: 15, fontWeight: '600', padding: 10 },
  leaveTxt: { color: '#E05555', fontSize: 15, fontWeight: '700', padding: 10 },
});