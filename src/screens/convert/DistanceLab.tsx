import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ImageBackground,
  Dimensions, Share, ScrollView, Modal, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');
const isSmall = height < 700;

const HISTORY_KEY = '@distance_history';

const UNITS = [
  'Light Years',
  'Kilometers',
  'Miles',
  'Astronomical Units',
  'Parsecs',
  'Light Seconds',
  'Meters',
];

interface HistoryItem {
  id: string;
  from: string;
  to: string;
  input: string;
  result: string;
  date: string;
}

const TO_METERS: Record<string, number> = {
  'Light Years':        9.461e15,
  'Kilometers':         1e3,
  'Miles':              1609.344,
  'Astronomical Units': 1.496e11,
  'Parsecs':            3.086e16,
  'Light Seconds':      2.998e8,
  'Meters':             1,
};

function convertUnits(value: number, from: string, to: string): number {
  return (value * TO_METERS[from]) / TO_METERS[to];
}

function formatNumber(num: number): string {
  if (num === 0) return '0';
  if (Math.abs(num) >= 1e15 || Math.abs(num) < 1e-6) return num.toExponential(4);
  return num.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

const NUM_KEYS = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['.', '0', '⌫'],
];

export default function DistanceLab() {
  const [input, setInput] = useState('');
  const [from, setFrom] = useState('Light Years');
  const [to, setTo] = useState('Kilometers');
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => { loadHistory(); }, []);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem(HISTORY_KEY);
      if (data) setHistory(JSON.parse(data));
    } catch {}
  };

  const saveToHistory = async (item: HistoryItem) => {
    try {
      const newHistory = [item, ...history].slice(0, 20);
      setHistory(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch {}
  };

  const clearHistory = async () => {
    try {
      setHistory([]);
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch {}
  };

  const handleKey = (key: string) => {
    if (key === '⌫') { setInput(prev => prev.slice(0, -1)); setResult(null); return; }
    if (key === '.') {
      if (input.includes('.')) return;
      setInput(prev => prev + (prev === '' ? '0.' : '.')); setResult(null); return;
    }
    if (input.length >= 15) return;
    setInput(prev => prev + key);
    setResult(null);
  };

  const handleConvert = () => {
    const val = parseFloat(input);
    if (isNaN(val) || !input.trim()) return;
    const converted = convertUnits(val, from, to);
    const resultStr = `${formatNumber(val)} ${from} = ${formatNumber(converted)} ${to}`;
    setResult(resultStr);
    saveToHistory({
      id: Date.now().toString(), from, to,
      input: formatNumber(val), result: formatNumber(converted),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    });
  };

  const handleShare = async () => {
    if (!result) return;
    try { await Share.share({ message: `🌌 Star Distance Lab\n${result}\n\nCalculated with AstroTrails` }); } catch {}
  };

  const handleCancel = () => { setInput(''); setResult(null); };
  const swapUnits = () => { setFrom(to); setTo(from); setResult(null); };

  const KEY_SIZE = (width - 40 - 3 * 10) / 4;

  return (
    <ImageBackground source={require('../../assets/splash_bg.png')} style={s.bg} resizeMode="cover">
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scrollContent}
          bounces={false}
        >
          <View style={s.headerRow}>
            <View style={s.headerTexts}>
              <Text style={s.title}>Star Distance Lab</Text>
              <Text style={s.sub}>Explore the scale of the universe through simple cosmic calculations</Text>
            </View>
            <TouchableOpacity style={s.historyBtn} onPress={() => setShowHistory(true)}>
              <Text style={s.historyBtnTxt}>🕐</Text>
              {history.length > 0 && (
                <View style={s.historyBadge}>
                  <Text style={s.historyBadgeTxt}>{history.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={s.display}>
            <Text style={s.displayValue} numberOfLines={1} adjustsFontSizeToFit>
              {input || '0'}
            </Text>
            {result && (
              <Text style={s.displayResult} numberOfLines={2}>{result}</Text>
            )}
          </View>

          <View style={s.pickerRow}>
            <TouchableOpacity
              style={s.picker}
              onPress={() => { setShowFromPicker(true); setShowToPicker(false); }}
            >
              <Text style={s.pickerTxt} numberOfLines={1}>{from}</Text>
              <Text style={s.pickerArrow}>▾</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.swapBtn} onPress={swapUnits}>
              <Text style={s.swapTxt}>⇄</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.picker}
              onPress={() => { setShowToPicker(true); setShowFromPicker(false); }}
            >
              <Text style={s.pickerTxt} numberOfLines={1}>{to}</Text>
              <Text style={s.pickerArrow}>▾</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={s.resultActions}>
              <TouchableOpacity style={s.copyBtn} onPress={handleShare}>
                <Text style={s.copyBtnTxt}>⎘</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.shareBtn} onPress={handleShare}>
                <Text style={s.shareTxt}>Share</Text>
                <Text style={s.shareArrow}> ↗</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <View style={s.keyboardSection}>
          <View style={s.keyboard}>
            {NUM_KEYS.map((row, rowIdx) => (
              <View key={rowIdx} style={s.keyRow}>
                {row.map(key => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      s.key,
                      { width: KEY_SIZE, height: isSmall ? 42 : 50 },
                      key === '⌫' && s.keyBackspace,
                    ]}
                    onPress={() => handleKey(key)}
                    activeOpacity={0.6}
                  >
                    <Text style={[s.keyTxt, key === '⌫' && s.keyBackspaceTxt]}>
                      {key}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            <View style={s.keyRow}>
              <TouchableOpacity
                style={[s.key, s.keyAction, { width: KEY_SIZE * 1.5 + 5, height: isSmall ? 42 : 50 }]}
                onPress={handleCancel}
                activeOpacity={0.6}
              >
                <Text style={s.keyActionTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  s.key, s.keyConvert,
                  { width: KEY_SIZE * 2.5 + 20, height: isSmall ? 42 : 50 },
                  !input.trim() && s.keyConvertDisabled,
                ]}
                onPress={handleConvert}
                disabled={!input.trim()}
                activeOpacity={0.7}
              >
                <Text style={s.keyConvertTxt}>Convert</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal visible={showFromPicker} transparent animationType="slide">
          <View style={s.modalOverlay}>
            <View style={s.pickerModal}>
              <View style={s.pickerModalHeader}>
                <Text style={s.pickerModalTitle}>From Unit</Text>
                <TouchableOpacity onPress={() => setShowFromPicker(false)}>
                  <Text style={s.pickerModalClose}>✕</Text>
                </TouchableOpacity>
              </View>
              {UNITS.map(unit => (
                <TouchableOpacity
                  key={unit}
                  style={[s.pickerOption, from === unit && s.pickerOptionActive]}
                  onPress={() => { setFrom(unit); setShowFromPicker(false); setResult(null); }}
                >
                  <Text style={[s.pickerOptionTxt, from === unit && s.pickerOptionTxtActive]}>{unit}</Text>
                  {from === unit && <Text style={s.pickerCheck}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Modal visible={showToPicker} transparent animationType="slide">
          <View style={s.modalOverlay}>
            <View style={s.pickerModal}>
              <View style={s.pickerModalHeader}>
                <Text style={s.pickerModalTitle}>To Unit</Text>
                <TouchableOpacity onPress={() => setShowToPicker(false)}>
                  <Text style={s.pickerModalClose}>✕</Text>
                </TouchableOpacity>
              </View>
              {UNITS.map(unit => (
                <TouchableOpacity
                  key={unit}
                  style={[s.pickerOption, to === unit && s.pickerOptionActive]}
                  onPress={() => { setTo(unit); setShowToPicker(false); setResult(null); }}
                >
                  <Text style={[s.pickerOptionTxt, to === unit && s.pickerOptionTxtActive]}>{unit}</Text>
                  {to === unit && <Text style={s.pickerCheck}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        <Modal visible={showHistory} transparent animationType="slide">
          <View style={s.modalOverlay}>
            <View style={s.historyModal}>
              <View style={s.pickerModalHeader}>
                <Text style={s.pickerModalTitle}>History</Text>
                <View style={s.historyHeaderBtns}>
                  {history.length > 0 && (
                    <TouchableOpacity onPress={clearHistory} style={s.clearBtn}>
                      <Text style={s.clearBtnTxt}>Clear</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => setShowHistory(false)}>
                    <Text style={s.pickerModalClose}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {history.length === 0 ? (
                <View style={s.historyEmpty}>
                  <Text style={s.historyEmptyTxt}>No conversions yet</Text>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {history.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      style={s.historyItem}
                      onPress={() => {
                        setFrom(item.from); setTo(item.to);
                        setInput(item.input.replace(/,/g, ''));
                        setResult(`${item.input} ${item.from} = ${item.result} ${item.to}`);
                        setShowHistory(false);
                      }}
                    >
                      <View style={s.historyItemTop}>
                        <Text style={s.historyItemFrom}>{item.from}</Text>
                        <Text style={s.historyItemArrow}>→</Text>
                        <Text style={s.historyItemTo}>{item.to}</Text>
                        <Text style={s.historyItemDate}>{item.date}</Text>
                      </View>
                      <Text style={s.historyItemResult}>{item.input} = {item.result}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
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
  scrollContent: {
    paddingBottom: 16,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: isSmall ? 10 : 16,
    paddingBottom: isSmall ? 8 : 12,
  },
  headerTexts: { flex: 1 },
  title: { color: '#FFF', fontSize: isSmall ? 18 : 22, fontWeight: '700', marginBottom: 4 },
  sub: { color: '#888899', fontSize: isSmall ? 11 : 12, lineHeight: isSmall ? 16 : 18 },
  historyBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(19,19,31,0.8)',
    justifyContent: 'center', alignItems: 'center', marginLeft: 12,
  },
  historyBtnTxt: { fontSize: 18 },
  historyBadge: {
    position: 'absolute', top: 0, right: 0,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#F5C842',
    justifyContent: 'center', alignItems: 'center',
  },
  historyBadgeTxt: { color: '#0A0A0F', fontSize: 9, fontWeight: '700' },
  display: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(13,13,26,0.9)',
    borderRadius: 16,
    padding: isSmall ? 14 : 18,
    marginBottom: 10,
    minHeight: isSmall ? 70 : 90,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  displayValue: {
    color: '#FFF',
    fontSize: isSmall ? 28 : 36,
    fontWeight: '300',
    textAlign: 'right',
    letterSpacing: 1,
  },
  displayResult: {
    color: '#F5C842',
    fontSize: isSmall ? 11 : 13,
    marginTop: 6,
    lineHeight: isSmall ? 16 : 20,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 8,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: 'rgba(19,19,31,0.9)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: isSmall ? 9 : 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  pickerTxt: { color: '#FFF', fontSize: isSmall ? 11 : 12, flex: 1 },
  pickerArrow: { color: '#888899', fontSize: 11 },
  swapBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: 'rgba(245,200,66,0.15)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(245,200,66,0.3)',
  },
  swapTxt: { color: '#F5C842', fontSize: 16 },
  resultActions: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  copyBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(245,200,66,0.15)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(245,200,66,0.3)',
  },
  copyBtnTxt: { color: '#F5C842', fontSize: 20 },
  shareBtn: {
    flex: 1, flexDirection: 'row',
    backgroundColor: '#F5C842',
    paddingVertical: isSmall ? 10 : 12,
    borderRadius: 24, alignItems: 'center', justifyContent: 'center',
  },
  shareTxt: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 14 : 15 },
  shareArrow: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 14 : 15 },
  keyboardSection: {
    backgroundColor: 'rgba(10,10,20,0.97)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingBottom: Platform.OS === 'ios' ? 110 : 120,
  },
  keyboard: {
    paddingTop: isSmall ? 8 : 12,
    paddingHorizontal: 20,
    gap: isSmall ? 6 : 8,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  key: {
    backgroundColor: 'rgba(50,50,70,0.9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  keyBackspace: { backgroundColor: 'rgba(30,30,50,0.9)' },
  keyTxt: { color: '#FFF', fontSize: isSmall ? 18 : 22, fontWeight: '400' },
  keyBackspaceTxt: { color: '#E05555', fontSize: isSmall ? 18 : 20 },
  keyAction: { backgroundColor: 'rgba(30,30,50,0.9)' },
  keyActionTxt: { color: '#888899', fontSize: isSmall ? 13 : 15, fontWeight: '600' },
  keyConvert: { backgroundColor: '#F5C842' },
  keyConvertDisabled: { opacity: 0.4 },
  keyConvertTxt: { color: '#0A0A0F', fontSize: isSmall ? 14 : 16, fontWeight: '700' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end',
  },
  pickerModal: {
    backgroundColor: '#0D0D1A',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, maxHeight: '70%',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  historyModal: {
    backgroundColor: '#0D0D1A',
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, maxHeight: '75%',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  pickerModalHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  pickerModalTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  pickerModalClose: { color: '#888899', fontSize: 18, padding: 4 },
  pickerOption: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: isSmall ? 11 : 14,
    paddingHorizontal: 12, borderRadius: 10, marginBottom: 4,
  },
  pickerOptionActive: {
    backgroundColor: 'rgba(245,200,66,0.1)',
    borderWidth: 1, borderColor: 'rgba(245,200,66,0.3)',
  },
  pickerOptionTxt: { color: '#B0B0C8', fontSize: isSmall ? 14 : 15 },
  pickerOptionTxtActive: { color: '#F5C842', fontWeight: '600' },
  pickerCheck: { color: '#F5C842', fontSize: 16, fontWeight: '700' },
  historyHeaderBtns: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  clearBtn: {
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12,
    backgroundColor: 'rgba(224,85,85,0.15)',
    borderWidth: 1, borderColor: 'rgba(224,85,85,0.3)',
  },
  clearBtnTxt: { color: '#E05555', fontSize: 13, fontWeight: '600' },
  historyEmpty: { paddingVertical: 40, alignItems: 'center' },
  historyEmptyTxt: { color: '#888899', fontSize: 14 },
  historyItem: {
    backgroundColor: 'rgba(26,26,46,0.6)',
    borderRadius: 12, padding: 12, marginBottom: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  historyItemTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 6 },
  historyItemFrom: { color: '#F5C842', fontSize: 12, fontWeight: '600' },
  historyItemArrow: { color: '#555570', fontSize: 12 },
  historyItemTo: { color: '#F5C842', fontSize: 12, fontWeight: '600', flex: 1 },
  historyItemDate: { color: '#555570', fontSize: 11 },
  historyItemResult: { color: '#B0B0C8', fontSize: 13 },
});