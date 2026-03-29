import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, ImageBackground, Dimensions, Platform,
} from 'react-native';
import { Article, ARTICLES } from '../../data/stories';

const { height } = Dimensions.get('window');
const isSmall = height < 700;

export default function ArticleRead({ navigation, route }: any) {
  const article: Article = ARTICLES.find(
    (a: Article) => a.id === route.params?.id
  ) ?? ARTICLES[0];

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
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={s.backBtn}
          >
            <Text style={s.backTxt}>←</Text>
          </TouchableOpacity>

          <Text style={s.title}>{article.title}</Text>

          <View style={s.body}>
            {article.content.split('\n\n').map((paragraph: string, i: number) => (
              <Text key={i} style={s.paragraph}>{paragraph}</Text>
            ))}
          </View>

          <TouchableOpacity
            style={s.quizBtn}
            onPress={() => navigation.navigate('QuizScreen', { articleId: article.id })}
          >
            <Text style={s.quizBtnTxt}>Start Quiz →</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  container: { flex: 1 },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 130 : 160,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  backBtn: {
    padding: 16,
    paddingBottom: 8,
  },
  backTxt: {
    color: '#FFF',
    fontSize: 22,
  },
  title: {
    color: '#FFF',
    fontSize: isSmall ? 18 : 22,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: isSmall ? 16 : 20,
    lineHeight: isSmall ? 26 : 30,
  },
  body: {
    paddingHorizontal: 20,
    marginBottom: isSmall ? 20 : 28,
  },
  paragraph: {
    color: '#C0C0D8',
    fontSize: isSmall ? 13 : 14,
    lineHeight: isSmall ? 21 : 24,
    marginBottom: isSmall ? 14 : 18,
  },
  quizBtn: {
    backgroundColor: '#F5C842',
    marginHorizontal: 20,
    paddingVertical: isSmall ? 13 : 15,
    borderRadius: 28,
    alignItems: 'center',
  },
  quizBtnTxt: {
    color: '#0A0A0F',
    fontWeight: '700',
    fontSize: isSmall ? 14 : 15,
  },
});