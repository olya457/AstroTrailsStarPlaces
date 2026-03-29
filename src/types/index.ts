export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
};

export type MainTabParamList = {
  Locations: undefined;
  Objects: undefined;
  Convert: undefined;
  Stories: undefined;
  Draw: undefined;
};

export type LocationsStackParamList = {
  LocationsList: undefined;
  MapView: undefined;
  LocationDetail: { id: string };
};

export type ObjectsStackParamList = {
  StarArchive: undefined;
  ObjectDetail: { id: string };
  MyObjects: undefined;
  AddObject: undefined;
};

export type StoriesStackParamList = {
  CosmicKnowledge: undefined;
  ArticleRead: { id: string };
  QuizScreen: { articleId: string };
  QuizResult: { score: number; total: number };
};

export type DrawStackParamList = {
  SketchHome: undefined;
  DrawCanvas: { imageUri?: string };
};

export interface Location {
  id: string;
  name: string;
  region: string;
  country: string;
  description: string;
  imageUrl: string;
  coordinates: { lat: number; lng: number };
}

export interface CosmicObject {
  id: string;
  name: string;
  type: string;
  constellation: string;
  description: string;
  imageUrl: string;
  isCustom?: boolean;
}

export interface Article {
  id: string;
  title: string;
  preview: string;
  content: string;
  hasQuiz: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Sketch {
  id: string;
  imageUri: string;
  createdAt: string;
}