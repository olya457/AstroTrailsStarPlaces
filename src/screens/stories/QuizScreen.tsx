import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Modal, Animated, ImageBackground, Dimensions, Platform,
} from 'react-native';
import { QUIZ_QUESTIONS } from '../../data/stories';

const { height } = Dimensions.get('window');
const isSmall = height < 700;

export default function QuizScreen({ navigation }: any) {
  const questions = QUIZ_QUESTIONS;
  const total = questions.length;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showLeave, setShowLeave] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const q = questions[current];
  const progress = (current / total) * 100;

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === q.correct;
    const newScore = score + (isCorrect ? 1 : 0);

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        if (current + 1 >= total) {
          navigation.replace('QuizResult', { score: newScore, total });
        } else {
          setScore(newScore);
          setCurrent(c => c + 1);
          setSelected(null);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }
      });
    }, 900);
  };

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>

        <View style={[s.topBar, Platform.OS === 'android' && s.topBarAndroid]}>
          <TouchableOpacity style={s.backBtn} onPress={() => setShowLeave(true)}>
            <Text style={s.backTxt}>←</Text>
          </TouchableOpacity>
          <Text style={s.counter}>Question {current + 1} of {total}</Text>
          <View style={s.backBtn} />
        </View>

        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${progress}%` }]} />
        </View>

        <Animated.View style={[s.qBox, { opacity: fadeAnim }]}>
          <Text style={s.question}>{q.question}</Text>
        </Animated.View>

        <Animated.View style={[s.options, { opacity: fadeAnim }]}>
          {q.options.map((opt: string, i: number) => {
            const isSelected = selected === i;
            const isCorrect = i === q.correct;
            const showResult = selected !== null;

            return (
              <TouchableOpacity
                key={i}
                style={[
                  s.option,
                  showResult && isCorrect ? s.optCorrect : null,
                  showResult && isSelected && !isCorrect ? s.optWrong : null,
                ]}
                onPress={() => handleAnswer(i)}
                activeOpacity={selected !== null ? 1 : 0.8}
              >
                <View style={[
                  s.letterCircle,
                  showResult && isCorrect ? s.letterCircleCorrect : null,
                  showResult && isSelected && !isCorrect ? s.letterCircleWrong : null,
                ]}>
                  <Text style={[
                    s.optLetter,
                    showResult && isCorrect ? s.optLetterCorrect : null,
                    showResult && isSelected && !isCorrect ? s.optLetterWrong : null,
                  ]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={s.optTxt}>{opt}</Text>
                {showResult && isCorrect && <Text style={s.checkMark}>✓</Text>}
                {showResult && isSelected && !isCorrect && <Text style={s.crossMark}>✕</Text>}
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        <Modal visible={showLeave} transparent animationType="fade">
          <View style={s.modalOverlay}>
            <View style={s.modal}>
              <Text style={s.modalTitle}>Leave this quiz?</Text>
              <Text style={s.modalSub}>
                If you leave now, your current progress will be lost.
              </Text>
              <View style={s.modalBtns}>
                <TouchableOpacity style={s.stayBtn} onPress={() => setShowLeave(false)}>
                  <Text style={s.stayTxt}>Stay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.leaveBtn}
                  onPress={() => { setShowLeave(false); navigation.navigate('CosmicKnowledge'); }}
                >
                  <Text style={s.leaveTxt}>Leave</Text>
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
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: isSmall ? 8 : 14,
    paddingBottom: 8,
  },
  topBarAndroid: {
    paddingTop: (isSmall ? 8 : 14) + 20,
  },
  backBtn: {
    width: isSmall ? 36 : 40,
    height: isSmall ? 36 : 40,
    borderRadius: isSmall ? 18 : 20,
    backgroundColor: 'rgba(19,19,31,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTxt: { color: '#FFF', fontSize: isSmall ? 18 : 20 },
  counter: { color: '#FFF', fontSize: isSmall ? 13 : 15, fontWeight: '700' },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    borderRadius: 2,
    marginBottom: isSmall ? 8 : 12,
  },
  progressFill: { height: 3, backgroundColor: '#F5C842', borderRadius: 2 },
  qBox: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: isSmall ? 76 : 85,
  },
  question: {
    color: '#FFF',
    fontSize: isSmall ? 17 : 21,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: isSmall ? 24 : 30,
  },
  options: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? (isSmall ? 160 : 180) : (isSmall ? 140 : 160),
    gap: isSmall ? 7 : 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13,13,26,0.9)',
    borderRadius: 14,
    padding: isSmall ? 10 : 14,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  optCorrect: { backgroundColor: 'rgba(20,60,20,0.95)', borderColor: '#3A8A3A' },
  optWrong: { backgroundColor: 'rgba(60,20,20,0.95)', borderColor: '#8A3A3A' },
  letterCircle: {
    width: isSmall ? 26 : 32,
    height: isSmall ? 26 : 32,
    borderRadius: isSmall ? 13 : 16,
    backgroundColor: 'rgba(245,200,66,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245,200,66,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterCircleCorrect: { backgroundColor: 'rgba(58,138,58,0.3)', borderColor: '#3A8A3A' },
  letterCircleWrong: { backgroundColor: 'rgba(138,58,58,0.3)', borderColor: '#8A3A3A' },
  optLetter: { color: '#F5C842', fontWeight: '700', fontSize: isSmall ? 11 : 14 },
  optLetterCorrect: { color: '#3ACA3A' },
  optLetterWrong: { color: '#CA3A3A' },
  optTxt: { color: '#FFF', fontSize: isSmall ? 12 : 14, flex: 1, lineHeight: isSmall ? 17 : 20 },
  checkMark: { color: '#3ACA3A', fontSize: isSmall ? 14 : 16, fontWeight: '700' },
  crossMark: { color: '#CA3A3A', fontSize: isSmall ? 14 : 16, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#0D0D1A', borderRadius: 20, padding: isSmall ? 20 : 24, width: 280, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  modalTitle: { color: '#FFF', fontSize: isSmall ? 15 : 17, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  modalSub: { color: '#888899', fontSize: isSmall ? 12 : 13, textAlign: 'center', marginBottom: 20, lineHeight: 18 },
  modalBtns: { flexDirection: 'row', justifyContent: 'space-around' },
  stayBtn: { paddingHorizontal: 20, paddingVertical: 10 },
  stayTxt: { color: '#888899', fontSize: isSmall ? 14 : 15, fontWeight: '600' },
  leaveBtn: { paddingHorizontal: 20, paddingVertical: 10 },
  leaveTxt: { color: '#E05555', fontSize: isSmall ? 14 : 15, fontWeight: '700' },
});