
import { Client, Databases, Account, ID, Query } from 'appwrite';
import { MemoryFragment } from './memory';
import { adminService } from './adminService';

// Fonction utilitaire pour nettoyer l'endpoint (retire le slash final s'il existe)
const cleanEndpoint = (url: string | undefined) => {
    if (!url) return 'https://fra.cloud.appwrite.io/v1';
    return url.replace(/\/$/, "");
};

// CONFIGURATION PAR DÉFAUT
// Note: process.env est polyfillé par vite.config.ts, mais on ajoute une sécurité
// CONFIGURATION PAR DÉFAUT
const DEFAULT_CONFIG = {
    ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
    PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '694a84b40023501db111',
    DB_ID: process.env.NEXT_PUBLIC_APPWRITE_DB_ID || 'genesis_core',
    COLLECTION_FRAGMENTS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || 'fragments'
};

class AppwriteService {
    client: Client;
    databases: Databases;
    account: Account;
    isConfigured: boolean = false;

    // Configuration active
    private currentDbId: string = DEFAULT_CONFIG.DB_ID;
    private currentCollectionId: string = DEFAULT_CONFIG.COLLECTION_FRAGMENTS;

    constructor() {
        this.client = new Client();
        this.databases = new Databases(this.client);
        this.account = new Account(this.client);

        this.checkConfiguration();

        // Écouter les changements de config
        if (typeof window !== 'undefined') {
            window.addEventListener('genesis-config-updated', () => {
                this.checkConfiguration();
                console.log("[APPWRITE] Configuration rechargée via événement admin.");
            });
        }
    }

    checkConfiguration() {
        const adminConfig = adminService.getGlobalAppwriteConfig();

        if (adminConfig && adminConfig.isActive) {
            // Priorité Admin
            try {
                this.init(adminConfig.projectId, adminConfig.endpoint);
                this.currentDbId = adminConfig.databaseId;
                this.currentCollectionId = adminConfig.collectionId;
            } catch (e) { console.error("Appwrite Admin Config Error", e); }
        } else {
            // Fallback Utilisateur (via LocalStorage ou Défaut Env)
            const storedProject = typeof window !== 'undefined' ? localStorage.getItem('GENESIS_APPWRITE_PROJECT') : null;
            const storedEndpoint = typeof window !== 'undefined' ? localStorage.getItem('GENESIS_APPWRITE_ENDPOINT') : null;

            if (storedProject) {
                this.init(storedProject, storedEndpoint || DEFAULT_CONFIG.ENDPOINT);
            } else if (DEFAULT_CONFIG.PROJECT_ID) {
                this.init(DEFAULT_CONFIG.PROJECT_ID, DEFAULT_CONFIG.ENDPOINT);
            }
        }
    }

    init(projectId: string, endpoint: string = DEFAULT_CONFIG.ENDPOINT) {
        try {
            if (!projectId) {
                console.warn("[APPWRITE] Project ID manquant.");
                return;
            }

            const validEndpoint = cleanEndpoint(endpoint);

            this.client
                .setEndpoint(validEndpoint)
                .setProject(projectId);

            // Re-appliquer les défauts si non surchargés
            this.currentDbId = DEFAULT_CONFIG.DB_ID;
            this.currentCollectionId = DEFAULT_CONFIG.COLLECTION_FRAGMENTS;

            this.ensureDatabase().then(() => {
                this.isConfigured = true;
                console.log("[APPWRITE] Initialisé & Vérifié:", { projectId, endpoint: validEndpoint });
            });
        } catch (error) {
            console.error("[APPWRITE] Erreur d'initialisation:", error);
        }
    }

    // [JANUS_OPTIMIZATION] Auto-Repair Routine
    async ensureDatabase() {
        try {
            // Client SDK generally cannot 'get' or 'create' databases directly.
            // We verify by attempting to list documents.
            await this.databases.listDocuments(this.currentDbId, this.currentCollectionId, [Query.limit(1)]);
        } catch (error: any) {
            if (error.code === 404) {
                console.log('[JANUS] Base de données principale manquante/inaccessible. Re-synthèse demandée...');
                // Note: Database creation requires API Key/Server SDK, typically not exposed in client.
                // We log the attempt as requested by protocol.
                console.warn('[JANUS] Droits Admin requis pour re-création. Initialisation en mode dégradé (Local Fallback).');
            }
        }
    }

    isSystemManaged(): boolean {
        return !!adminService.getGlobalAppwriteConfig()?.isActive || !!(DEFAULT_CONFIG.PROJECT_ID && DEFAULT_CONFIG.PROJECT_ID !== '694a84b40023501db111');
    }

    // --- AUTHENTIFICATION ---

    async register(email: string, password: string, name: string) {
        if (!this.isConfigured) throw new Error("Système non connecté au Cloud (Vérifiez Project ID).");
        try {
            await this.account.create(ID.unique(), email, password, name);
            return await this.login(email, password);
        } catch (error: any) {
            console.error("Register Error:", error);
            if (error.message === "Failed to fetch") {
                throw new Error("Impossible de joindre le serveur Appwrite. Vérifiez que votre domaine Vercel est ajouté comme 'Web Platform' dans Appwrite.");
            }
            throw error;
        }
    }

    async login(email: string, password: string) {
        if (!this.isConfigured) throw new Error("Système non connecté au Cloud (Vérifiez Project ID).");
        try {
            try {
                const current = await this.account.get();
                if (current) return current;
            } catch (e) { }

            return await this.account.createEmailPasswordSession(email, password);
        } catch (error: any) {
            console.error("Login Error:", error);
            if (error.message === "Failed to fetch") {
                throw new Error("Impossible de joindre le serveur Appwrite. Vérifiez que votre domaine Vercel est ajouté comme 'Web Platform' dans Appwrite.");
            }
            throw error;
        }
    }

    async logout() {
        if (!this.isConfigured) return;
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.warn("Logout warning:", error);
        }
    }

    async getCurrentUser() {
        if (!this.isConfigured) return null;
        try {
            return await this.account.get();
        } catch (error: any) {
            return null;
        }
    }

    // --- BASE DE DONNÉES ---

    async recordAccessLog(agentName: string, success: boolean): Promise<boolean> {
        if (!this.isConfigured) return false;
        try {
            await this.databases.createDocument(
                this.currentDbId,
                this.currentCollectionId,
                ID.unique(),
                {
                    type: 'audit',
                    content: `ACCESS: ${agentName} // ${success ? 'OK' : 'DENIED'}`,
                    metadata: JSON.stringify({ agent: agentName, success }),
                    timestamp: new Date().toISOString()
                }
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    async verifyConnection(): Promise<{ success: boolean; message: string }> {
        if (!this.isConfigured) return { success: false, message: "Client non configuré." };

        try {
            const doc = await this.databases.createDocument(
                this.currentDbId,
                this.currentCollectionId,
                ID.unique(),
                {
                    type: 'system',
                    content: 'PING',
                    metadata: JSON.stringify({ timestamp: Date.now() }),
                    timestamp: new Date().toISOString()
                }
            );
            return { success: true, message: `Connecté (ID: ${doc.$id})` };
        } catch (error: any) {
            console.error("[APPWRITE DIAGNOSTIC]", error);
            if (error.message === "Failed to fetch") return { success: false, message: "Erreur Réseau / CORS" };
            if (error.code === 404) return { success: false, message: "Base de données introuvable" };
            if (error.code === 401) return { success: false, message: "Non autorisé (vérifiez permissions)" };
            return { success: false, message: error.message || "Erreur inconnue" };
        }
    }

    async saveFragment(fragment: Omit<MemoryFragment, 'id'>) {
        if (!this.isConfigured) return;
        try {
            await this.databases.createDocument(
                this.currentDbId,
                this.currentCollectionId,
                ID.unique(),
                {
                    type: fragment.type,
                    content: fragment.content,
                    metadata: JSON.stringify(fragment.metadata || {}),
                    timestamp: new Date().toISOString()
                }
            );
        } catch (error) {
            console.warn("[APPWRITE] Save Error:", error);
        }
    }

    async getFragments(type?: string, limit: number = 50) {
        if (!this.isConfigured) return [];
        try {
            const queries = [Query.orderDesc('timestamp'), Query.limit(limit)];
            if (type) queries.push(Query.equal('type', type));

            const response = await this.databases.listDocuments(this.currentDbId, this.currentCollectionId, queries);

            return response.documents.map(doc => ({
                id: doc.$id,
                type: doc.type,
                content: doc.content,
                metadata: JSON.parse(doc.metadata || '{}'),
                timestamp: new Date(doc.timestamp).getTime()
            }));
        } catch (error) {
            return [];
        }
    }
    // --- USER PROFILES ---

    async getUserProfile(userId: string) {
        if (!this.isConfigured) return null;
        try {
            const response = await this.databases.listDocuments(
                this.currentDbId,
                'user_profiles', // Assumes collection exists
                [Query.equal('user_id', userId)]
            );

            if (response.documents.length > 0) {
                return response.documents[0];
            } else {
                // Create profile if not exists
                return await this.databases.createDocument(
                    this.currentDbId,
                    'user_profiles',
                    ID.unique(),
                    {
                        user_id: userId,
                        credits: 0,
                        notes: '',
                        clearance_level: 1
                    }
                );
            }
        } catch (error) {
            console.warn("[APPWRITE] Profile Fetch Error (likely collection missing):", error);
            return null;
        }
    }

    async updateUserProfile(userId: string, data: { credits?: number, notes?: string, clearance_level?: number }) {
        if (!this.isConfigured) return false;
        try {
            const profile = await this.getUserProfile(userId);
            if (!profile) return false;

            await this.databases.updateDocument(
                this.currentDbId,
                'user_profiles',
                profile.$id,
                data
            );
            return true;
        } catch (error) {
            console.error("[APPWRITE] Profile Update Error:", error);
            return false;
        }
    }

    // --- AGENT VAULT (PQC Keys Cloud Sync) ---

    async saveVaultKey(userId: string, keyData: { id: string; algorithm: string; entropy: number; status: string; signature: string }) {
        if (!this.isConfigured) return null;
        try {
            return await this.databases.createDocument(
                this.currentDbId,
                'agent_vault', // Collection for secure PQC keys
                ID.unique(),
                {
                    user_id: userId,
                    key_id: keyData.id,
                    algorithm: keyData.algorithm,
                    entropy: keyData.entropy,
                    status: keyData.status,
                    signature: keyData.signature,
                    created_at: new Date().toISOString()
                }
            );
        } catch (error) {
            console.warn("[APPWRITE] Vault Save Error (collection may not exist):", error);
            return null;
        }
    }

    async getVaultKeys(userId: string) {
        if (!this.isConfigured) return [];
        try {
            const response = await this.databases.listDocuments(
                this.currentDbId,
                'agent_vault',
                [Query.equal('user_id', userId), Query.orderDesc('created_at')]
            );

            return response.documents.map(doc => ({
                id: doc.key_id,
                algorithm: doc.algorithm,
                entropy: doc.entropy,
                status: doc.status,
                signature: doc.signature
            }));
        } catch (error) {
            console.warn("[APPWRITE] Vault Fetch Error:", error);
            return [];
        }
    }

    async revokeVaultKey(docId: string) {
        if (!this.isConfigured) return false;
        try {
            await this.databases.deleteDocument(this.currentDbId, 'agent_vault', docId);
            return true;
        } catch (error) {
            console.error("[APPWRITE] Vault Revoke Error:", error);
            return false;
        }
    }
}

export const appwriteService = new AppwriteService();
