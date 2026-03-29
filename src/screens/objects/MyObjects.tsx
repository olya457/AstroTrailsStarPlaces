import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, ImageBackground,
  Dimensions, Modal, Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { objectsStore, MyObject } from '../../store/objectsStore';

const { height } = Dimensions.get('window');
const isSmall = height < 700;

export default function MyObjects({ navigation }: any) {
  const [myObjects, setMyObjects] = useState<MyObject[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      const loadData = async () => {
        await objectsStore.load();
        if (active) {
          setMyObjects(objectsStore.getAll());
          setLoading(false);
        }
      };
      loadData();
      const unsubscribe = objectsStore.subscribe(() => {
        if (active) setMyObjects(objectsStore.getAll());
      });
      return () => { active = false; unsubscribe(); };
    }, [])
  );

  const confirmDelete = async () => {
    if (!deleteId) return;
    await objectsStore.delete(deleteId);
    setDeleteId(null);
  };

  if (loading) {
    return (
      <ImageBackground source={require('../../assets/splash_bg.png')} style={s.bg} resizeMode="cover">
        <View style={s.overlay} />
        <SafeAreaView style={s.container}>
          <View style={s.loadingWrap}>
            <Text style={s.loadingTxt}>Loading...</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../../assets/splash_bg.png')} style={s.bg} resizeMode="cover">
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>
        <View style={[s.header, Platform.OS === 'android' && s.headerAndroid]}>
          <Text style={s.title}>Cosmic Objects</Text>
          <Text style={s.sub}>Stars, nebulae, galaxies and the wonders that fill the night sky.</Text>
        </View>

        <View style={s.tabs}>
          <TouchableOpacity style={s.tab} onPress={() => navigation.navigate('StarArchive')}>
            <Text style={s.tabTxt}>Star Archive</Text>
          </TouchableOpacity>
          <View style={s.tabActive}>
            <Text style={s.tabActiveTxt}>My Objects</Text>
          </View>
        </View>

        {myObjects.length === 0 ? (
          <View style={s.empty}>
            <View style={s.emptyIconWrap}>
              <Text style={s.emptyEmoji}>✦</Text>
            </View>
            <Text style={s.emptyTitle}>Your Personal Cosmos Starts Here</Text>
            <Text style={s.emptySub}>
              Save your favorite celestial objects or create your own entries to build a private library of the night sky
            </Text>
            <TouchableOpacity style={s.addBtnCenter} onPress={() => navigation.navigate('AddObject')}>
              <Text style={s.addBtnCenterTxt}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={myObjects}
            keyExtractor={i => i.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: Platform.OS === 'android' ? 160 : 130,
            }}
            renderItem={({ item }) => (
              <View style={s.item}>
                <View style={s.itemIconWrap}>
                  <Text style={s.itemEmoji}>✦</Text>
                </View>
                <View style={s.itemInfo}>
                  <Text style={s.itemName}>{item.name}</Text>
                  {!!item.type && <Text style={s.itemType}>{item.type}</Text>}
                  {!!item.description && <Text style={s.itemDesc} numberOfLines={2}>{item.description}</Text>}
                </View>
                <TouchableOpacity style={s.deleteBtn} onPress={() => setDeleteId(item.id)}>
                  <Text style={s.deleteBtnTxt}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {myObjects.length > 0 && (
          <TouchableOpacity style={s.fab} onPress={() => navigation.navigate('AddObject')}>
            <Text style={s.fabTxt}>+</Text>
          </TouchableOpacity>
        )}

        <Modal visible={!!deleteId} transparent animationType="fade">
          <View style={s.modalOverlay}>
            <View style={s.modal}>
              <Text style={s.modalTitle}>Delete this object?</Text>
              <Text style={s.modalSub}>This can't be undone. Your data will be removed from this entry.</Text>
              <View style={s.modalBtns}>
                <TouchableOpacity style={s.modalCancelBtn} onPress={() => setDeleteId(null)}>
                  <Text style={s.modalCancelTxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.modalDeleteBtn} onPress={confirmDelete}>
                  <Text style={s.modalDeleteTxt}>Delete</Text>
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
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingTxt: { color: '#888899', fontSize: 14 },
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
    marginBottom: isSmall ? 10 : 16,
    marginTop: isSmall ? 8 : 12,
  },
  tab: { flex: 1, paddingVertical: isSmall ? 7 : 9, borderRadius: 9, alignItems: 'center' },
  tabActive: { flex: 1, backgroundColor: '#F5C842', paddingVertical: isSmall ? 7 : 9, borderRadius: 9, alignItems: 'center' },
  tabTxt: { color: '#888899', fontSize: isSmall ? 12 : 14, fontWeight: '600' },
  tabActiveTxt: { color: '#0A0A0F', fontSize: isSmall ? 12 : 14, fontWeight: '700' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, paddingBottom: 80 },
  emptyIconWrap: {
    width: isSmall ? 60 : 72,
    height: isSmall ? 60 : 72,
    borderRadius: isSmall ? 30 : 36,
    backgroundColor: 'rgba(245,200,66,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isSmall ? 16 : 20,
  },
  emptyEmoji: { fontSize: isSmall ? 26 : 32, color: '#F5C842' },
  emptyTitle: { color: '#FFF', fontSize: isSmall ? 16 : 20, fontWeight: '700', textAlign: 'center', marginBottom: 10, lineHeight: isSmall ? 22 : 28 },
  emptySub: { color: '#888899', fontSize: isSmall ? 12 : 13, textAlign: 'center', lineHeight: isSmall ? 18 : 20, marginBottom: 28 },
  addBtnCenter: { width: isSmall ? 46 : 52, height: isSmall ? 46 : 52, borderRadius: isSmall ? 23 : 26, backgroundColor: '#F5C842', justifyContent: 'center', alignItems: 'center' },
  addBtnCenterTxt: { color: '#0A0A0F', fontSize: 28, lineHeight: 32 },
  item: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 10, backgroundColor: 'rgba(19,19,31,0.85)', borderRadius: 14, overflow: 'hidden', alignItems: 'center' },
  itemIconWrap: { width: isSmall ? 60 : 72, height: isSmall ? 60 : 72, backgroundColor: '#1A1A3A', justifyContent: 'center', alignItems: 'center' },
  itemEmoji: { fontSize: isSmall ? 24 : 28, color: '#F5C842' },
  itemInfo: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  itemName: { color: '#FFF', fontSize: isSmall ? 13 : 14, fontWeight: '700', marginBottom: 2 },
  itemType: { color: '#F5C842', fontSize: isSmall ? 10 : 11, marginBottom: 4 },
  itemDesc: { color: '#888899', fontSize: isSmall ? 10 : 11, lineHeight: 15 },
  deleteBtn: { padding: 16 },
  deleteBtnTxt: { color: '#E05555', fontSize: 16 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: Platform.OS === 'android' ? 112 : 92,
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#0D0D1A', borderRadius: 16, padding: 24, width: 280, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  modalTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  modalSub: { color: '#888899', fontSize: 13, textAlign: 'center', lineHeight: 18, marginBottom: 20 },
  modalBtns: { flexDirection: 'row', justifyContent: 'space-around' },
  modalCancelBtn: { paddingHorizontal: 20, paddingVertical: 10 },
  modalCancelTxt: { color: '#888899', fontSize: 15, fontWeight: '600' },
  modalDeleteBtn: { paddingHorizontal: 20, paddingVertical: 10 },
  modalDeleteTxt: { color: '#E05555', fontSize: 15, fontWeight: '700' },
});