
const ADMIN_STORAGE_KEY = 'GENESIS_ADMIN_CONFIG';

interface ServiceConfig {
    key: string;
    isActive: boolean;
    lastUpdated: number;
}

interface GlobalConfig {
    gemini: ServiceConfig;
    groq: ServiceConfig;
    vertex: {
        projectId: string;
        location: string;
        isActive: boolean;
    };
    appwrite: {
        projectId: string;
        endpoint: string;
        databaseId: string;
        collectionId: string;
        isActive: boolean;
    };
}

// Helper pour lire l'environnement (compatible Vite & Node)
// Helper supprimé (utilisation directe de process.env requise par Next.js)

// Configuration par défaut qui tente de lire les variables d'environnement
// Si les variables ne sont pas là, on utilise des chaînes vides ou des valeurs par défaut
// Configuration par défaut avec accès explicite pour le remplacement par le compilateur Next.js
const DEFAULT_CONFIG: GlobalConfig = {
    gemini: {
        key: process.env.API_KEY || '',
        isActive: !!process.env.API_KEY,
        lastUpdated: Date.now()
    },
    groq: {
        key: process.env.GROQ_API_KEY || '',
        isActive: !!process.env.GROQ_API_KEY,
        lastUpdated: Date.now()
    },
    vertex: {
        projectId: process.env.VERTEX_PROJECT_ID || '',
        location: process.env.VERTEX_LOCATION || 'us-central1',
        isActive: !!process.env.VERTEX_PROJECT_ID
    },
    appwrite: {
        projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '694a84b40023501db111',
        endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DB_ID || 'genesis_core',
        collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || 'fragments',
        isActive: !!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    }
};

export const adminService = {
    getConfig(): GlobalConfig {
        if (typeof window === 'undefined') return DEFAULT_CONFIG;
        const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);

            // Priorité : Configuration stockée > Variables d'environnement > Défauts
            // Mais si une variable d'env est présente et que la config stockée est vide, on l'injecte
            const merged = {
                ...DEFAULT_CONFIG,
                ...parsed,
                appwrite: { ...DEFAULT_CONFIG.appwrite, ...parsed.appwrite },
                vertex: { ...DEFAULT_CONFIG.vertex, ...parsed.vertex },
                gemini: { ...DEFAULT_CONFIG.gemini, ...parsed.gemini },
                groq: { ...DEFAULT_CONFIG.groq, ...parsed.groq }
            };

            // Force l'activation si les clés sont dans l'environnement mais pas dans le storage
            if (process.env.API_KEY && !parsed.gemini?.key) {
                merged.gemini.key = process.env.API_KEY;
                merged.gemini.isActive = true;
            }
            if (process.env.GROQ_API_KEY && !parsed.groq?.key) {
                merged.groq.key = process.env.GROQ_API_KEY;
                merged.groq.isActive = true;
            }

            return merged;
        }
        return DEFAULT_CONFIG;
    },

    saveConfig(config: GlobalConfig) {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(config));
        window.dispatchEvent(new Event('genesis-config-updated'));
    },

    getGlobalGeminiKey(): string | null {
        const config = this.getConfig();
        // Fallback ultime sur process.env si la config est active
        return config.gemini.isActive ? (config.gemini.key || process.env.API_KEY || null) : null;
    },

    getGlobalGroqKey(): string | null {
        const config = this.getConfig();
        return config.groq.isActive ? (config.groq.key || process.env.GROQ_API_KEY || null) : null;
    },

    getGlobalVertexConfig() {
        const config = this.getConfig();
        return config.vertex.isActive ? config.vertex : null;
    },

    getGlobalAppwriteConfig() {
        const config = this.getConfig();
        return config.appwrite.isActive ? config.appwrite : null;
    },

    isAdminConfigured(): boolean {
        const config = this.getConfig();
        return config.gemini.isActive || config.groq.isActive || config.appwrite.isActive || config.vertex.isActive;
    }
};
