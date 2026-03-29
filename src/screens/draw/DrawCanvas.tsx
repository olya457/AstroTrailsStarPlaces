import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Image, Dimensions, Modal,
  PanResponder, ImageBackground, Alert, Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import { sketchStore } from '../../store/sketchStore';

const { height, width } = Dimensions.get('window');
const isSmall = height < 700;

const COLORS = [
  '#F5C842', '#FF6B35', '#FF3B5C', '#FF69B4',
  '#A855F7', '#3B82F6', '#06B6D4', '#10B981',
  '#FFFFFF', '#94A3B8', '#64748B', '#000000',
];

interface PathData {
  d: string;
  color: string;
  width: number;
}

export default function DrawCanvas({ navigation, route }: any) {
  const location = route.params?.location;

  const [paths, setPaths] = useState<PathData[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#F5C842');
  const [brushSize, setBrushSize] = useState<number>(0.3);
  const [imageOpacity, setImageOpacity] = useState<number>(0.8);
  const [showLeave, setShowLeave] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [sliderMode, setSliderMode] = useState<'opacity' | 'brush'>('opacity');
  const [saving, setSaving] = useState<boolean>(false);

  const canvasRef = useRef<View>(null);
  const isDrawing = useRef<boolean>(false);
  const sliderWidth = width - 140;
  const brushActual = 2 + brushSize * 18;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      isDrawing.current = true;
      setCurrentPath(`M${locationX},${locationY}`);
    },
    onPanResponderMove: (evt) => {
      if (!isDrawing.current) return;
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath(prev => `${prev} L${locationX},${locationY}`);
    },
    onPanResponderRelease: () => {
      if (currentPath) {
        setPaths(prev => [...prev, { d: currentPath, color: selectedColor, width: brushActual }]);
        setCurrentPath('');
      }
      isDrawing.current = false;
    },
  });

  const handleUndo = () => setPaths(prev => prev.slice(0, -1));

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const uri = await captureRef(canvasRef, { format: 'png', quality: 0.9 });
      await sketchStore.add({
        id: Date.now().toString(),
        uri,
        locationName: location?.name ?? 'My Sketch',
        createdAt: new Date().toISOString(),
      });
      navigation.navigate('SketchHome');
    } catch {
      Alert.alert('Error', 'Could not save sketch. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSliderTouch = (evt: any, mode: 'opacity' | 'brush') => {
    const x = evt.nativeEvent.locationX;
    const ratio = Math.max(0, Math.min(1, x / sliderWidth));
    if (mode === 'opacity') setImageOpacity(ratio);
    else setBrushSize(ratio);
  };

  const sliderValue = sliderMode === 'opacity' ? imageOpacity : brushSize;

  return (
    <ImageBackground source={require('../../assets/splash_bg.png')} style={s.bg} resizeMode="cover">
      <View style={s.darkOverlay} />
      <SafeAreaView style={s.container}>

        <View style={[s.topBar, Platform.OS === 'android' && s.topBarAndroid]}>
          <TouchableOpacity style={s.backBtn} onPress={() => setShowLeave(true)}>
            <Text style={s.backBtnTxt}>←</Text>
          </TouchableOpacity>
          <Text style={s.topTitle} numberOfLines={1}>
            {location?.name ?? 'Sketch the Stars'}
          </Text>
          <TouchableOpacity
            style={[s.saveBtn, saving && s.saveBtnDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={s.saveBtnTxt}>{saving ? '...' : 'Save'}</Text>
          </TouchableOpacity>
        </View>

        <View
          ref={canvasRef}
          style={s.canvas}
          {...panResponder.panHandlers}
          collapsable={false}
        >
          {location?.image && (
            <Image
              source={location.image}
              style={[s.canvasImage, { opacity: imageOpacity }]}
              resizeMode="cover"
            />
          )}
          <Svg style={StyleSheet.absoluteFillObject}>
            {paths.map((p, i) => (
              <Path
                key={i}
                d={p.d}
                stroke={p.color}
                strokeWidth={p.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ))}
            {currentPath ? (
              <Path
                d={currentPath}
                stroke={selectedColor}
                strokeWidth={brushActual}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ) : null}
          </Svg>
        </View>

        <View style={s.toolbar}>
          <View style={s.sliderModeRow}>
            <TouchableOpacity
              style={[s.modeBtn, sliderMode === 'opacity' && s.modeBtnActive]}
              onPress={() => setSliderMode('opacity')}
            >
              <Text style={[s.modeBtnTxt, sliderMode === 'opacity' && s.modeBtnTxtActive]}>Opacity</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.modeBtn, sliderMode === 'brush' && s.modeBtnActive]}
              onPress={() => setSliderMode('brush')}
            >
              <Text style={[s.modeBtnTxt, sliderMode === 'brush' && s.modeBtnTxtActive]}>Brush</Text>
            </TouchableOpacity>
          </View>

          <View style={s.controlRow}>
            <TouchableOpacity style={s.undoBtn} onPress={handleUndo}>
              <Text style={s.undoBtnTxt}>↩</Text>
            </TouchableOpacity>

            <View style={s.sliderWrap}>
              <View style={s.sliderTrack}>
                <View style={[s.sliderFill, { width: `${sliderValue * 100}%` }]} />
              </View>
              <View style={[s.sliderThumb, { left: `${sliderValue * 100}%` }]} />
              <View
                style={s.sliderTouchArea}
                onStartShouldSetResponder={() => true}
                onResponderGrant={e => handleSliderTouch(e, sliderMode)}
                onResponderMove={e => handleSliderTouch(e, sliderMode)}
              />
            </View>

            <TouchableOpacity
              style={[s.colorPickerBtn, { backgroundColor: selectedColor }]}
              onPress={() => setShowColorPicker(true)}
            />
          </View>
        </View>

        <Modal visible={showLeave} transparent animationType="fade">
          <View style={s.modalOverlay}>
            <View style={s.modal}>
              <Text style={s.modalTitle}>Leave Sketch?</Text>
              <Text style={s.modalSub}>If you leave now, your current progress will be lost.</Text>
              <View style={s.modalBtns}>
                <TouchableOpacity onPress={() => setShowLeave(false)}>
                  <Text style={s.stayTxt}>Stay</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setShowLeave(false); navigation.navigate('SketchHome'); }}>
                  <Text style={s.leaveTxt}>Leave</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal visible={showColorPicker} transparent animationType="slide">
          <View style={s.modalOverlay}>
            <View style={s.colorModal}>
              <Text style={s.colorModalTitle}>Choose Color</Text>
              <View style={s.colorGrid}>
                {COLORS.map(color => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      s.colorSwatch,
                      { backgroundColor: color },
                      selectedColor === color && s.colorSwatchSelected,
                    ]}
                    onPress={() => { setSelectedColor(color); setShowColorPicker(false); }}
                  />
                ))}
              </View>
              <TouchableOpacity style={s.colorCloseBtn} onPress={() => setShowColorPicker(false)}>
                <Text style={s.colorCloseTxt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </ImageBackground>
  );
}

const TOOLBAR_PADDING_BOTTOM = Platform.OS === 'ios'
  ? (isSmall ? 110 : 120)
  : (isSmall ? 120 : 130);

const s = StyleSheet.create({
  bg: { flex: 1 },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: isSmall ? 6 : 10,
    gap: 10,
  },
  topBarAndroid: {
    paddingTop: (isSmall ? 6 : 10) + 20,
  },
  backBtn: {
    width: isSmall ? 34 : 40,
    height: isSmall ? 34 : 40,
    borderRadius: isSmall ? 17 : 20,
    backgroundColor: 'rgba(19,19,31,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnTxt: { color: '#FFF', fontSize: isSmall ? 18 : 20 },
  topTitle: { flex: 1, color: '#FFF', fontSize: isSmall ? 13 : 16, fontWeight: '600', textAlign: 'center' },
  saveBtn: {
    backgroundColor: '#F5C842',
    paddingHorizontal: isSmall ? 16 : 22,
    paddingVertical: isSmall ? 7 : 10,
    borderRadius: 20,
  },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnTxt: { color: '#0A0A0F', fontWeight: '700', fontSize: isSmall ? 12 : 14 },
  canvas: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1A1A2E',
  },
  canvasImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  toolbar: {
    backgroundColor: 'rgba(0,0,0,0.92)',
    paddingHorizontal: 16,
    paddingTop: isSmall ? 8 : 10,
    paddingBottom: TOOLBAR_PADDING_BOTTOM,
    gap: isSmall ? 6 : 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  sliderModeRow: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  modeBtn: {
    paddingHorizontal: isSmall ? 14 : 18,
    paddingVertical: isSmall ? 3 : 5,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  modeBtnActive: { backgroundColor: 'rgba(245,200,66,0.2)', borderWidth: 1, borderColor: '#F5C842' },
  modeBtnTxt: { color: '#888899', fontSize: isSmall ? 11 : 12, fontWeight: '600' },
  modeBtnTxtActive: { color: '#F5C842' },
  controlRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  undoBtn: {
    width: isSmall ? 40 : 50,
    height: isSmall ? 40 : 50,
    borderRadius: isSmall ? 20 : 25,
    backgroundColor: 'rgba(40,40,60,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  undoBtnTxt: { color: '#FFF', fontSize: isSmall ? 18 : 22 },
  sliderWrap: { flex: 1, height: isSmall ? 40 : 50, justifyContent: 'center', position: 'relative' },
  sliderTrack: { height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' },
  sliderFill: { height: '100%', backgroundColor: '#F5C842', borderRadius: 2 },
  sliderThumb: {
    position: 'absolute',
    width: isSmall ? 18 : 22,
    height: isSmall ? 18 : 22,
    borderRadius: isSmall ? 9 : 11,
    backgroundColor: '#FFF',
    top: '50%',
    marginTop: isSmall ? -9 : -11,
    marginLeft: isSmall ? -9 : -11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  sliderTouchArea: { ...StyleSheet.absoluteFillObject },
  colorPickerBtn: {
    width: isSmall ? 40 : 50,
    height: isSmall ? 40 : 50,
    borderRadius: isSmall ? 20 : 25,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modal: {
    backgroundColor: '#0D0D1A',
    borderRadius: 20,
    padding: isSmall ? 20 : 24,
    width: 280,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  modalTitle: { color: '#FFF', fontSize: isSmall ? 15 : 17, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  modalSub: { color: '#888899', fontSize: isSmall ? 12 : 13, textAlign: 'center', marginBottom: 20, lineHeight: 18 },
  modalBtns: { flexDirection: 'row', justifyContent: 'space-around' },
  stayTxt: { color: '#888899', fontSize: isSmall ? 14 : 15, fontWeight: '600', padding: 10 },
  leaveTxt: { color: '#E05555', fontSize: isSmall ? 14 : 15, fontWeight: '700', padding: 10 },
  colorModal: {
    backgroundColor: '#0D0D1A',
    borderRadius: 20,
    padding: isSmall ? 20 : 24,
    width: isSmall ? 280 : 300,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  colorModalTitle: { color: '#FFF', fontSize: isSmall ? 14 : 16, fontWeight: '700', textAlign: 'center', marginBottom: isSmall ? 14 : 20 },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: isSmall ? 10 : 12, justifyContent: 'center', marginBottom: isSmall ? 14 : 20 },
  colorSwatch: {
    width: isSmall ? 38 : 44,
    height: isSmall ? 38 : 44,
    borderRadius: isSmall ? 19 : 22,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSwatchSelected: { borderColor: '#FFF', transform: [{ scale: 1.15 }] },
  colorCloseBtn: {
    paddingVertical: isSmall ? 10 : 12,
    borderRadius: 24,
    backgroundColor: 'rgba(26,26,46,0.9)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  colorCloseTxt: { color: '#888899', fontWeight: '600', fontSize: isSmall ? 13 : 14 },
});