
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
const getEnv = (key: string) => {
    if (import.meta.env && import.meta.env[key]) return import.meta.env[key];
    if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
    return undefined;
};

// Configuration par défaut qui tente de lire les variables d'environnement
// Si les variables ne sont pas là, on utilise des chaînes vides ou des valeurs par défaut
const DEFAULT_CONFIG: GlobalConfig = {
    gemini: {
        key: getEnv('API_KEY') || '',
        isActive: !!getEnv('API_KEY'),
        lastUpdated: Date.now()
    },
    groq: {
        key: getEnv('GROQ_API_KEY') || '',
        isActive: !!getEnv('GROQ_API_KEY'),
        lastUpdated: Date.now()
    },
    vertex: {
        projectId: getEnv('VERTEX_PROJECT_ID') || '',
        location: getEnv('VERTEX_LOCATION') || 'us-central1',
        isActive: !!getEnv('VERTEX_PROJECT_ID')
    },
    appwrite: {
        projectId: getEnv('NEXT_PUBLIC_APPWRITE_PROJECT_ID') || getEnv('EXPO_PUBLIC_APPWRITE_PROJECT_ID') || '694a84b40023501db111',
        endpoint: getEnv('NEXT_PUBLIC_APPWRITE_ENDPOINT') || getEnv('EXPO_PUBLIC_APPWRITE_ENDPOINT') || 'https://fra.cloud.appwrite.io/v1',
        databaseId: getEnv('NEXT_PUBLIC_APPWRITE_DB_ID') || getEnv('EXPO_PUBLIC_APPWRITE_DB_ID') || 'genesis_core',
        collectionId: getEnv('NEXT_PUBLIC_APPWRITE_COLLECTION_ID') || getEnv('EXPO_PUBLIC_APPWRITE_COLLECTION_ID') || 'fragments',
        isActive: !!(getEnv('NEXT_PUBLIC_APPWRITE_PROJECT_ID') || getEnv('EXPO_PUBLIC_APPWRITE_PROJECT_ID'))
    }
};

export const adminService = {
    getConfig(): GlobalConfig {
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
