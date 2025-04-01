import type { CopyHistoryItem } from "@/types/copy-history";

type StorageKey = string;

export type CopyHistoryStorageSchema = {
  copyHistoryList: CopyHistoryItem[];
};

class LocalStorageWrapper<T extends Record<StorageKey, unknown>> {
  private isClient = typeof window !== "undefined";
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  private ensureClient() {
    if (!this.isClient) {
      console.warn("localStorage can only be accessed in the client-side environment");
      return false;
    }
    return true;
  }

  private prefixedKey(key: StorageKey): string {
    return `${this.prefix}_${key}`;
  }

  get<K extends keyof T>(key: K): T[K] | null {
    if (!this.ensureClient()) return null;
    try {
      const item = window.localStorage.getItem(this.prefixedKey(key as string));
      return item ? (JSON.parse(item) as T[K]) : null;
    } catch (error) {
      console.error(`Error parsing localStorage key "${String(key)}":`, error);
      return null;
    }
  }

  getAll(): { [key in keyof T]?: T[key] } | null {
    if (!this.ensureClient()) return null;
    try {
      const allItems: { [key in keyof T]?: T[key] } = {};
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          const item = window.localStorage.getItem(key);
          if (item) {
            const parsedItem = JSON.parse(item);
            allItems[key.replace(`${this.prefix}_`, '') as keyof T] = parsedItem;
          }
        }
      }
      return allItems;
    } catch (error) {
      console.error("Error retrieving all localStorage items:", error);
      return null;
    }
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    if (!this.ensureClient()) return;
    try {
      window.localStorage.setItem(this.prefixedKey(key as string), JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${String(key)}":`, error);
    }
  }

  remove<K extends keyof T>(key: K): void {
    if (!this.ensureClient()) return;
    try {
      window.localStorage.removeItem(this.prefixedKey(key as string));
    } catch (error) {
      console.error(`Error removing localStorage key "${String(key)}":`, error);
    }
  }

  clear(): void {
    if (!this.ensureClient()) return;  // Skip the logic if not in client-side environment
    try {
      // Iterate over all keys to remove only those with the prefix
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          window.localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}

const copyHistoryStorage = new LocalStorageWrapper<CopyHistoryStorageSchema>('404nb');

export {
  copyHistoryStorage
};
