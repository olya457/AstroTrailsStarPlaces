import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MyObject {
  id: string;
  name: string;
  type: string;
  description: string;
}

const KEY = '@my_objects';

class ObjectsStore {
  private objects: MyObject[] = [];
  private listeners: Array<() => void> = [];
  private loaded = false;

  async load(): Promise<void> {
    if (this.loaded) return;
    try {
      const data = await AsyncStorage.getItem(KEY);
      this.objects = data ? JSON.parse(data) : [];
      this.loaded = true;
    } catch {
      this.objects = [];
      this.loaded = true;
    }
  }

  getAll(): MyObject[] {
    return [...this.objects];
  }

  async add(object: MyObject): Promise<void> {
    this.objects.push(object);
    await this.persist();
    this.notify();
  }

  async delete(id: string): Promise<void> {
    this.objects = this.objects.filter(o => o.id !== id);
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
      await AsyncStorage.setItem(KEY, JSON.stringify(this.objects));
    } catch {}
  }

  private notify(): void {
    this.listeners.forEach(l => l());
  }
}

export const objectsStore = new ObjectsStore();