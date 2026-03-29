import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, Dimensions, Share, ImageBackground, Platform,
} from 'react-native';
import { OBJECTS } from '../../data/objects';

const { height } = Dimensions.get('window');
const isSmall = height < 700;

export default function ObjectDetail({ navigation, route }: any) {
  const object = OBJECTS.find((o: any) => o.id === route.params?.id) ?? OBJECTS[0];

  const handleShare = async () => {
    try {
      await Share.share({
        title: object.name,
        message: `${object.name}\n${object.type} — ${object.constellation}\n\n${object.cosmicStory}\n\n${object.whatYouNotice}`,
      });
    } catch {}
  };

  return (
    <ImageBackground source={require('../../assets/splash_bg.png')} style={s.bg} resizeMode="cover">
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scrollContent}
        >
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backTxt}>←</Text>
          </TouchableOpacity>

          <View style={[s.hero, { backgroundColor: object.color + '33' }]}>
            <View style={[s.heroCircle, { backgroundColor: object.color + '22', borderColor: object.color + '55' }]}>
              <Text style={s.heroEmoji}>{object.emoji}</Text>
            </View>
          </View>

          <View style={s.body}>
            <Text style={s.name}>{object.name}</Text>
            <View style={s.tagRow}>
              <View style={s.typeTag}>
                <Text style={s.typeTagTxt}>{object.type}</Text>
              </View>
              <Text style={s.constellation}>✦ {object.constellation}</Text>
            </View>
            <Text style={s.cosmicStory}>{object.cosmicStory}</Text>
            <View style={s.section}>
              <Text style={s.sectionTitle}>Why This Object Is Special</Text>
              <Text style={s.sectionBody}>{object.whySpecial}</Text>
            </View>
            <View style={s.section}>
              <Text style={[s.sectionTitle, s.sectionTitleYellow]}>What You Can Notice</Text>
              <Text style={s.sectionBody}>{object.whatYouNotice}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={s.footer}>
          <TouchableOpacity style={s.closeBtn} onPress={() => navigation.goBack()}>
            <Text style={s.closeTxt}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.shareBtn} onPress={handleShare}>
            <Text style={s.shareTxt}>Share ↗</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const FOOTER_PADDING_BOTTOM = Platform.OS === 'ios'
  ? (isSmall ? 110 : 120)
  : (isSmall ? 120 : 130);

const s = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { flex: 1 },
  scrollContent: {
    paddingBottom: isSmall ? 140 : 160,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  backBtn: {
    margin: 16, marginBottom: 0,
    width: isSmall ? 36 : 42, height: isSmall ? 36 : 42,
    borderRadius: isSmall ? 18 : 21,
    backgroundColor: 'rgba(19,19,31,0.8)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  backTxt: { color: '#FFF', fontSize: isSmall ? 18 : 20 },
  hero: { width: '100%', height: isSmall ? 160 : 220, justifyContent: 'center', alignItems: 'center', marginTop: isSmall ? 12 : 16 },
  heroCircle: { width: isSmall ? 110 : 140, height: isSmall ? 110 : 140, borderRadius: isSmall ? 55 : 70, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  heroEmoji: { fontSize: isSmall ? 60 : 80 },
  body: { padding: isSmall ? 16 : 20 },
  name: { color: '#FFF', fontSize: isSmall ? 22 : 28, fontWeight: '700', marginBottom: 10 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: isSmall ? 14 : 18, flexWrap: 'wrap' },
  typeTag: { backgroundColor: 'rgba(245,200,66,0.15)', borderWidth: 1, borderColor: 'rgba(245,200,66,0.4)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  typeTagTxt: { color: '#F5C842', fontSize: isSmall ? 11 : 12, fontWeight: '600' },
  constellation: { color: '#888899', fontSize: isSmall ? 11 : 13 },
  cosmicStory: { color: '#B0B0C8', fontSize: isSmall ? 13 : 14, lineHeight: isSmall ? 20 : 23, marginBottom: isSmall ? 16 : 22 },
  section: { marginBottom: isSmall ? 16 : 20, backgroundColor: 'rgba(13,13,26,0.6)', borderRadius: 14, padding: isSmall ? 14 : 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  sectionTitle: { color: '#FFF', fontSize: isSmall ? 13 : 15, fontWeight: '700', marginBottom: isSmall ? 8 : 10 },
  sectionTitleYellow: { color: '#F5C842' },
  sectionBody: { color: '#B0B0C8', fontSize: isSmall ? 12 : 13, lineHeight: isSmall ? 19 : 22 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', gap: 12,
    paddingHorizontal: 16, paddingTop: 12,
    paddingBottom: FOOTER_PADDING_BOTTOM,
    backgroundColor: 'rgba(13,13,26,0.97)',
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)',
  },
  closeBtn: { flex: 1, paddingVertical: isSmall ? 12 : 14, borderRadius: 24, backgroundColor: 'rgba(26,26,46,0.9)', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  closeTxt: { color: '#888899', fontWeight: '600', fontSize: isSmall ? 13 : 14 },
  shareBtn: { flex: 1, paddingVertical: isSmall ? 12 : 14, borderRadius: 24, backgroundColor: '#F5C842', alignItems: 'center' },
  shareTxt: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 13 : 14 },
});