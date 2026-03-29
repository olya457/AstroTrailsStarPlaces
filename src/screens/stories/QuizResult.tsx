import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ImageBackground, Dimensions,
  Share, ScrollView, Platform,
} from 'react-native';

const { height } = Dimensions.get('window');
const isSmall = height < 700;

export default function QuizResult({ navigation, route }: any) {
  const { score = 0, total = 30 } = route.params ?? {};
  const percent = Math.round((score / total) * 100);
  const stars = Math.round((score / total) * 5);

  const getMessage = (): string => {
    if (percent >= 90) return "Outstanding! You're a true stargazer.";
    if (percent >= 70) return 'Great work! The cosmos is yours to explore.';
    if (percent >= 50) return 'Good effort! Keep looking up.';
    return 'Every journey starts somewhere. Keep exploring!';
  };

  const handleShare = async (): Promise<void> => {
    try {
      await Share.share({
        message: `🌌 I scored ${score}/${total} on the AstroTrails Cosmic Quiz!\n${getMessage()}`,
        title: 'AstroTrails Quiz Result',
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
          contentContainerStyle={s.scrollContent}
          bounces={false}
        >
          <Text style={s.emoji}>🌟</Text>
          <Text style={s.title}>Journey Complete</Text>
          <Text style={s.message}>{getMessage()}</Text>

          <View style={s.scoreCircle}>
            <Text style={s.scoreNum}>{score}</Text>
            <Text style={s.scoreTotal}>/{total}</Text>
          </View>

          <Text style={s.percent}>{percent}% correct</Text>

          <View style={s.stars}>
            {Array(5).fill(null).map((_: null, i: number) => (
              <Text key={i} style={[s.star, i < stars ? s.starActive : null]}>★</Text>
            ))}
          </View>

          <View style={s.statsRow}>
            <View style={s.statBox}>
              <Text style={s.statNum}>{score}</Text>
              <Text style={s.statLabel}>Correct</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statBox}>
              <Text style={s.statNum}>{total - score}</Text>
              <Text style={s.statLabel}>Incorrect</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statBox}>
              <Text style={s.statNum}>{percent}%</Text>
              <Text style={s.statLabel}>Score</Text>
            </View>
          </View>

          <View style={s.footer}>
            <TouchableOpacity style={s.shareBtn} onPress={handleShare}>
              <Text style={s.shareTxt}>Share ↗</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.doneBtn} onPress={() => navigation.popToTop()}>
              <Text style={s.doneTxt}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'android' ? (isSmall ? 40 : 60) : (isSmall ? 20 : 40),
    paddingBottom: Platform.OS === 'android' ? 160 : 100,
  },
  emoji: { fontSize: isSmall ? 44 : 64, marginBottom: isSmall ? 10 : 16 },
  title: { color: '#FFF', fontSize: isSmall ? 22 : 28, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  message: { color: '#888899', fontSize: isSmall ? 12 : 14, textAlign: 'center', lineHeight: isSmall ? 18 : 21, marginBottom: isSmall ? 16 : 24 },
  scoreCircle: {
    width: isSmall ? 90 : 120,
    height: isSmall ? 90 : 120,
    borderRadius: isSmall ? 45 : 60,
    backgroundColor: 'rgba(245,200,66,0.1)',
    borderWidth: 2,
    borderColor: '#F5C842',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  scoreNum: { color: '#F5C842', fontSize: isSmall ? 32 : 44, fontWeight: '700' },
  scoreTotal: { color: '#888899', fontSize: isSmall ? 16 : 22, alignSelf: 'flex-end', marginBottom: isSmall ? 5 : 8 },
  percent: { color: '#888899', fontSize: isSmall ? 12 : 14, marginBottom: isSmall ? 12 : 18 },
  stars: { flexDirection: 'row', gap: 6, marginBottom: isSmall ? 16 : 24 },
  star: { fontSize: isSmall ? 22 : 28, color: '#222240' },
  starActive: { color: '#F5C842' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(13,13,26,0.8)',
    borderRadius: 16,
    paddingVertical: isSmall ? 12 : 16,
    paddingHorizontal: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: isSmall ? 20 : 28,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { color: '#FFF', fontSize: isSmall ? 18 : 24, fontWeight: '700', marginBottom: 4 },
  statLabel: { color: '#888899', fontSize: isSmall ? 10 : 12 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 4 },
  footer: { flexDirection: 'row', gap: 12, width: '100%' },
  shareBtn: {
    flex: 1,
    paddingVertical: isSmall ? 12 : 16,
    borderRadius: 28,
    backgroundColor: 'rgba(245,200,66,0.15)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245,200,66,0.4)',
  },
  shareTxt: { color: '#F5C842', fontWeight: '700', fontSize: isSmall ? 13 : 15 },
  doneBtn: { flex: 1, paddingVertical: isSmall ? 12 : 16, borderRadius: 28, backgroundColor: '#F5C842', alignItems: 'center' },
  doneTxt: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 13 : 15 },
});