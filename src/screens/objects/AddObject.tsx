import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ImageBackground,
  Dimensions, Platform, ScrollView,
} from 'react-native';
import { objectsStore, MyObject } from '../../store/objectsStore';

const { height, width } = Dimensions.get('window');
const isSmall = height < 700;

const KEYS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['⇧','Z','X','C','V','B','N','M','⌫'],
  ['123','space','return'],
];

const KEYS_NUM = [
  ['1','2','3','4','5','6','7','8','9','0'],
  ['-','/',':',';','(',')','$','&','@','"'],
  ['#+=','.', ',','?','!','\'','⌫'],
  ['ABC','space','return'],
];

export default function AddObject({ navigation }: any) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');
  const [focused, setFocused] = useState<'name' | 'type' | 'desc'>('name');
  const [isUpper, setIsUpper] = useState(true);
  const [isNum, setIsNum] = useState(false);

  const getCurrentValue = () => {
    if (focused === 'name') return name;
    if (focused === 'type') return type;
    return desc;
  };

  const setCurrentValue = (val: string) => {
    if (focused === 'name') setName(val);
    else if (focused === 'type') setType(val);
    else setDesc(val);
  };

  const handleKey = (key: string) => {
    const current = getCurrentValue();
    if (key === '⌫') { setCurrentValue(current.slice(0, -1)); return; }
    if (key === '⇧') { setIsUpper(prev => !prev); return; }
    if (key === '123') { setIsNum(true); return; }
    if (key === 'ABC' || key === '#+=') { setIsNum(false); return; }
    if (key === 'space') { setCurrentValue(current + ' '); return; }
    if (key === 'return') {
      if (focused === 'name') setFocused('type');
      else if (focused === 'type') setFocused('desc');
      return;
    }
    const char = isUpper ? key : key.toLowerCase();
    setCurrentValue(current + char);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    const newObject: MyObject = {
      id: Date.now().toString(),
      name: name.trim(),
      type: type.trim(),
      description: desc.trim(),
    };
    await objectsStore.add(newObject);
    navigation.goBack();
  };

  const keys = isNum ? KEYS_NUM : KEYS;

  return (
    <ImageBackground
      source={require('../../assets/splash_bg.png')}
      style={s.bg}
      resizeMode="cover"
    >
      <View style={s.overlay} />
      <SafeAreaView style={s.container}>
        <ScrollView
          style={s.scrollArea}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={s.scrollContent}
        >
          <View style={s.header}>
            <Text style={s.title}>Add a Cosmic Object</Text>
            <Text style={s.sub}>Create a personal record for a celestial body</Text>
          </View>

          <View style={s.fieldTabs}>
            {(['name', 'type', 'desc'] as const).map((field) => (
              <TouchableOpacity
                key={field}
                style={[s.fieldTab, focused === field && s.fieldTabActive]}
                onPress={() => setFocused(field)}
              >
                <Text style={[s.fieldTabTxt, focused === field && s.fieldTabTxtActive]}>
                  {field === 'name' ? 'Name' : field === 'type' ? 'Type' : 'Desc'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={s.activeFieldContainer}>
            <Text style={s.activeFieldLabel}>
              {focused === 'name' ? 'Object Name' : focused === 'type' ? 'Object Type' : 'Description'}
            </Text>
            <Text style={s.activeFieldValue} numberOfLines={focused === 'desc' ? 3 : 1}>
              {getCurrentValue()}
              <Text style={s.cursor}>|</Text>
            </Text>
          </View>

          <View style={s.preview}>
            {!!name && focused !== 'name' && (
              <View style={s.previewRow}>
                <Text style={s.previewLabel}>Name</Text>
                <Text style={s.previewValue} numberOfLines={1}>{name}</Text>
              </View>
            )}
            {!!type && focused !== 'type' && (
              <View style={s.previewRow}>
                <Text style={s.previewLabel}>Type</Text>
                <Text style={s.previewValue} numberOfLines={1}>{type}</Text>
              </View>
            )}
            {!!desc && focused !== 'desc' && (
              <View style={s.previewRow}>
                <Text style={s.previewLabel}>Desc</Text>
                <Text style={s.previewValue} numberOfLines={1}>{desc}</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={s.bottomSection}>
          <View style={s.keyboard}>
            {keys.map((row, rowIndex) => (
              <View key={rowIndex} style={s.keyRow}>
                {row.map((key) => {
                  const isSpecial = ['⇧','⌫','123','ABC','#+='].includes(key);
                  const isSpace = key === 'space';
                  const isReturn = key === 'return';
                  const isBackspace = key === '⌫';
                  const isShift = key === '⇧';
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[
                        s.key,
                        isSpecial && s.keySpecial,
                        isSpace && s.keySpace,
                        isReturn && s.keyReturn,
                        isBackspace && s.keyBackspace,
                        isShift && isUpper && s.keyShiftActive,
                      ]}
                      onPress={() => handleKey(key)}
                      activeOpacity={0.6}
                    >
                      <Text style={[
                        s.keyTxt,
                        isSpecial && s.keySpecialTxt,
                        isReturn && s.keyReturnTxt,
                      ]}>
                        {isSpace ? 'space' :
                         isReturn ? (focused === 'desc' ? 'done' : 'next') :
                         isShift ? (isUpper ? '⇧' : '⇩') :
                         isUpper && !isNum ? key.toUpperCase() : key}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          <View style={s.actionBtns}>
            <TouchableOpacity style={s.cancelBtn} onPress={() => navigation.goBack()}>
              <Text style={s.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.saveBtn, !name.trim() && s.saveBtnDisabled]}
              onPress={handleSave}
              disabled={!name.trim()}
            >
              <Text style={s.saveTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const KEY_WIDTH = (width - 40 - 9 * 6) / 10;

const s = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  container: { flex: 1 },
  scrollArea: { flex: 1 },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: isSmall ? 10 : 16,
    paddingBottom: 6,
  },
  title: { color: '#FFF', fontSize: isSmall ? 18 : 22, fontWeight: '700', marginBottom: 4 },
  sub: { color: '#888899', fontSize: isSmall ? 11 : 12 },
  fieldTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(19,19,31,0.8)',
    borderRadius: 12,
    padding: 3,
    marginTop: 10,
    marginBottom: 10,
  },
  fieldTab: {
    flex: 1,
    paddingVertical: isSmall ? 6 : 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  fieldTabActive: {
    backgroundColor: 'rgba(245,200,66,0.15)',
    borderWidth: 1,
    borderColor: '#F5C842',
  },
  fieldTabTxt: { color: '#555570', fontSize: isSmall ? 12 : 13, fontWeight: '600' },
  fieldTabTxtActive: { color: '#F5C842' },
  activeFieldContainer: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(19,19,31,0.9)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#F5C842',
    padding: 14,
    minHeight: isSmall ? 60 : 70,
    marginBottom: 8,
  },
  activeFieldLabel: {
    color: '#F5C842',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  activeFieldValue: { color: '#FFF', fontSize: isSmall ? 15 : 17, fontWeight: '500', minHeight: 22 },
  cursor: { color: '#F5C842', fontWeight: '300' },
  preview: { marginHorizontal: 20, gap: 4 },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(19,19,31,0.5)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  previewLabel: { color: '#F5C842', fontSize: 10, fontWeight: '700', width: 36 },
  previewValue: { color: '#888899', fontSize: 11, flex: 1 },
  bottomSection: {
    backgroundColor: 'rgba(10,10,20,0.97)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingBottom: Platform.OS === 'ios' ? 110 : 120,
  },
  keyboard: {
    paddingTop: isSmall ? 8 : 10,
    paddingBottom: 6,
    gap: isSmall ? 5 : 6,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  key: {
    width: KEY_WIDTH,
    height: isSmall ? 34 : 42,
    backgroundColor: 'rgba(60,60,80,0.9)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
    elevation: 2,
  },
  keySpecial: { backgroundColor: 'rgba(30,30,50,0.9)', width: KEY_WIDTH * 1.5 + 9 },
  keySpace: { width: KEY_WIDTH * 5 + 4 * 6, backgroundColor: 'rgba(60,60,80,0.9)' },
  keyReturn: { width: KEY_WIDTH * 2 + 6, backgroundColor: 'rgba(245,200,66,0.2)', borderColor: '#F5C842' },
  keyBackspace: { backgroundColor: 'rgba(30,30,50,0.9)' },
  keyShiftActive: { backgroundColor: 'rgba(245,200,66,0.25)', borderColor: '#F5C842' },
  keyTxt: { color: '#FFFFFF', fontSize: isSmall ? 13 : 16, fontWeight: '500' },
  keySpecialTxt: { color: '#B0B0C8', fontSize: isSmall ? 10 : 13 },
  keyReturnTxt: { color: '#F5C842', fontSize: isSmall ? 11 : 13, fontWeight: '700' },
  actionBtns: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: isSmall ? 8 : 10,
    paddingBottom: isSmall ? 6 : 8,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: isSmall ? 11 : 13,
    borderRadius: 28,
    backgroundColor: 'rgba(26,26,46,0.9)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cancelTxt: { color: '#888899', fontWeight: '600', fontSize: isSmall ? 13 : 14 },
  saveBtn: { flex: 1, paddingVertical: isSmall ? 11 : 13, borderRadius: 28, backgroundColor: '#F5C842', alignItems: 'center' },
  saveBtnDisabled: { opacity: 0.4 },
  saveTxt: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 13 : 14 },
});