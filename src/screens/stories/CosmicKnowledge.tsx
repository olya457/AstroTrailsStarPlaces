import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, ImageBackground, Dimensions, Platform,
} from 'react-native';
import { Article, ARTICLES } from '../../data/stories';

const { height } = Dimensions.get('window');
const isSmall = height < 700;

export default function CosmicKnowledge({ navigation }: any) {
  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={s.item}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('ArticleRead', { id: item.id })}
    >
      <View style={s.itemBody}>
        <Text style={s.itemTitle}>{item.title}</Text>
        <Text style={s.itemPreview} numberOfLines={3}>{item.preview}</Text>
      </View>
    </TouchableOpacity>
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
          data={ARTICLES}
          keyExtractor={(item: Article) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'android' ? 160 : 100,
            paddingTop: Platform.OS === 'android' ? 20 : 0,
          }}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={s.header}>
              <Text style={s.title}>Cosmic Knowledge</Text>
              <Text style={s.sub}>Stories, science, and mysteries hidden in the night sky.</Text>
              <TouchableOpacity
                style={s.quizBtn}
                onPress={() => navigation.navigate('QuizScreen', { articleId: null })}
              >
                <Text style={s.quizBtnTxt}>Start Quiz</Text>
              </TouchableOpacity>
            </View>
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
    paddingBottom: isSmall ? 12 : 16,
  },
  title: {
    color: '#FFF',
    fontSize: isSmall ? 20 : 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  sub: {
    color: '#888899',
    fontSize: isSmall ? 12 : 13,
    marginBottom: isSmall ? 12 : 16,
    lineHeight: 18,
  },
  quizBtn: {
    backgroundColor: '#F5C842',
    paddingVertical: isSmall ? 12 : 14,
    borderRadius: 28,
    alignItems: 'center',
  },
  quizBtnTxt: {
    color: '#0A0A0F',
    fontWeight: '700',
    fontSize: isSmall ? 14 : 15,
  },
  item: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: 'rgba(13,13,26,0.85)',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  itemBody: {
    padding: isSmall ? 12 : 14,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: isSmall ? 14 : 15,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: isSmall ? 20 : 22,
  },
  itemPreview: {
    color: '#888899',
    fontSize: isSmall ? 12 : 13,
    lineHeight: isSmall ? 17 : 19,
  },
});