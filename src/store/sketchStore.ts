import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Sketch {
  id: string;
  uri: string;
  locationName: string;
  createdAt: string;
}

const KEY = '@my_sketches';

class SketchStore {
  private sketches: Sketch[] = [];
  private listeners: Array<() => void> = [];
  private loaded = false;

  async load(): Promise<void> {
    try {
      const data = await AsyncStorage.getItem(KEY);
      this.sketches = data ? JSON.parse(data) : [];
      this.loaded = true;
    } catch {
      this.sketches = [];
    }
  }

  getAll(): Sketch[] {
    return [...this.sketches];
  }

  async add(sketch: Sketch): Promise<void> {
    this.sketches.unshift(sketch);
    await this.persist();
    this.notify();
  }

  async delete(id: string): Promise<void> {
    this.sketches = this.sketches.filter(s => s.id !== id);
    await this.persist();
    this.notify();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private async persist(): Promise<void> {
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(this.sketches));
    } catch {}
  }

  private notify(): void {
    this.listeners.forEach(l => l());
  }
}

export const sketchStore = new SketchStore();