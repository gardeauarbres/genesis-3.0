
import { appwriteService } from './appwriteService';

// SERVICE DE MÉMOIRE HOLOGRAPHIQUE (IndexedDB Wrapper + Cloud Sync)
const DB_NAME = 'Genesis_Cortex_V1';
const DB_VERSION = 1;

export interface MemoryFragment {
  id?: number;
  type: 'conversation' | 'evolution' | 'threat' | 'system' | 'key';
  content: string;
  metadata?: any;
  timestamp: number;
}

class CortexMemory {
  private db: IDBDatabase | null = null;

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject("Échec initialisation Cortex.");
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('fragments')) {
          const store = db.createObjectStore('fragments', { keyPath: 'id', autoIncrement: true });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async save(fragment: Omit<MemoryFragment, 'id' | 'timestamp'>): Promise<void> {
    if (!this.db) await this.init();
    
    // 1. Sauvegarde Locale (IndexedDB) pour la rapidité
    const localPromise = new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['fragments'], 'readwrite');
      const store = transaction.objectStore('fragments');
      const request = store.add({
        ...fragment,
        timestamp: Date.now()
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // 2. Synchronisation Cloud (Appwrite) en arrière-plan
    appwriteService.saveFragment({
        ...fragment,
        timestamp: Date.now()
    }).catch(err => console.warn("Erreur Sync Cloud:", err));

    return localPromise;
  }

  async retrieveContext(limit: number = 5): Promise<string> {
    if (!this.db) await this.init();
    return new Promise((resolve) => {
      const transaction = this.db!.transaction(['fragments'], 'readonly');
      const store = transaction.objectStore('fragments');
      const index = store.index('timestamp');
      const request = index.openCursor(null, 'prev');
      
      const memories: string[] = [];
      let count = 0;

      request.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor && count < limit) {
          const val = cursor.value;
          memories.push(`[${new Date(val.timestamp).toLocaleTimeString()}] (${val.type.toUpperCase()}): ${val.content}`);
          count++;
          cursor.continue();
        } else {
          resolve(memories.reverse().join('\n'));
        }
      };
    });
  }

  async getAllTranscript(): Promise<any[]> {
     if (!this.db) await this.init();
     return new Promise((resolve) => {
        const transaction = this.db!.transaction(['fragments'], 'readonly');
        const store = transaction.objectStore('fragments');
        const index = store.index('timestamp');
        const request = index.getAll();
        request.onsuccess = () => {
           // Filtrer uniquement les conversations et prendre les 50 dernières
           const res = request.result
            .filter((m: any) => m.type === 'conversation')
            .slice(-50)
            .map((m: any) => ({
                role: m.metadata?.role || 'system',
                text: m.content
            }));
           resolve(res);
        };
     });
  }

  async getByType(type: string): Promise<MemoryFragment[]> {
     if (!this.db) await this.init();
     return new Promise((resolve) => {
        const transaction = this.db!.transaction(['fragments'], 'readonly');
        const store = transaction.objectStore('fragments');
        const index = store.index('type');
        const request = index.getAll(type);
        request.onsuccess = () => {
             // Trier par timestamp décroissant (le plus récent d'abord)
             const res = request.result.sort((a: any, b: any) => b.timestamp - a.timestamp);
             resolve(res);
        };
     });
  }
}

export const memory = new CortexMemory();
