
import { GoogleGenAI, Modality, Type, GenerateContentResponse } from "@google/genai";
import { memory } from "./memory";
import { adminService } from "./adminService";

// CONFIGURATION CENTRALISÉE DU SYSTÈME GENESIS
const GENESIS_CONFIG = {
  MODELS: {
    PRO: "gemini-3-pro-preview", // Modèle principal pour le raisonnement complexe
    FLASH: "gemini-3-flash-preview", // Modèle rapide pour les tâches simples
    TTS: "gemini-2.5-flash-preview-tts",
    IMAGE: "gemini-3-pro-image-preview",
    VEO: "veo-3.1-fast-generate-preview",
    MAPS: "gemini-2.5-flash"
  },
  BUDGETS: {
    MAX: 32768,
    STD: 16000
  },
  VOICE: 'Zephyr'
};

const STORAGE_KEY = 'GENESIS_GEMINI_KEY';

// GESTIONNAIRE D'ÉTAT SINGLETON POUR LE CLIENT API
class GenesisCore {
  private static instance: GoogleGenAI | null = null;
  private static currentKey: string | null = null;

  static getClient(): GoogleGenAI {
    // ORDRE DE PRIORITÉ : 
    // 1. Clé Admin (si active)
    // 2. Clé Utilisateur (LocalStorage)
    // 3. Env Var (Dev)
    const adminKey = adminService.getGlobalGeminiKey();
    const userKey = localStorage.getItem(STORAGE_KEY);
    const envKey = process.env.API_KEY;

    const key = adminKey || userKey || envKey;

    if (!key) throw new Error("[GENESIS_AUTH_FAIL] Clé API non détectée (Ni Admin, Ni Utilisateur)");

    if (!this.instance || this.currentKey !== key) {
      this.currentKey = key;
      this.instance = new GoogleGenAI({ apiKey: this.currentKey });
    }
    return this.instance;
  }

  static getCurrentKey(): string {
    return adminService.getGlobalGeminiKey() || localStorage.getItem(STORAGE_KEY) || process.env.API_KEY || '';
  }

  static isManaged(): boolean {
      return !!adminService.getGlobalGeminiKey();
  }

  static reset() {
    this.instance = null;
    this.currentKey = null;
  }
}

// Écouteur pour mettre à jour l'instance si l'admin change la config
if (typeof window !== 'undefined') {
    window.addEventListener('genesis-config-updated', () => GenesisCore.reset());
}

export const geminiService = {
  // Gestion de la Clé API
  setApiKey(key: string) {
    if (key && key.length > 10) {
      localStorage.setItem(STORAGE_KEY, key);
      GenesisCore.reset();
      return true;
    }
    return false;
  },

  getApiKey(): string {
    return GenesisCore.getCurrentKey();
  },

  hasKey(): boolean {
    return !!this.getApiKey();
  },

  isSystemManaged(): boolean {
      return GenesisCore.isManaged();
  },

  async _exec<T>(action: (ai: GoogleGenAI) => Promise<T>, fallback: T): Promise<T> {
    try {
      const ai = GenesisCore.getClient();
      return await action(ai);
    } catch (error) {
      console.error("[GENESIS_KERNEL_PANIC]", error);
      return fallback;
    }
  },

  // --- NOUVEAU : ORCHESTRATION AGENT ---
  async agentQuery(agentName: string, systemInstruction: string, query: string, contextData?: string) {
      return this._exec(async (ai) => {
          const contents: any[] = [{ role: 'user', parts: [{ text: query }] }];
          
          if (contextData) {
              contents.unshift({ role: 'user', parts: [{ text: `[CONTEXTE_DOCUMENTAIRE]: ${contextData}` }] });
          }

          const response = await ai.models.generateContent({
              model: GENESIS_CONFIG.MODELS.PRO,
              contents: contents,
              config: {
                  systemInstruction: `IDENTITÉ: Tu es l'agent ${agentName} du système GENESIS.\n${systemInstruction}\nTon style est technique, concis et adapté à ton rôle.`,
                  thinkingConfig: { thinkingBudget: GENESIS_CONFIG.BUDGETS.STD },
                  tools: [{ googleSearch: {} }] // Capacité de recherche activée pour tous les agents
              }
          });
          
          // Extraction des sources si recherche effectuée
          const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
          return { text: response.text || "...", sources };
      }, { text: "Agent Offline ou Erreur Réseau.", sources: [] });
  },

  // --- NOUVEAU : ANALYSE DOCUMENTAIRE ---
  async analyzeDocument(fileBase64: string, mimeType: string, query: string) {
      // Nous n'utilisons pas _exec ici pour capturer l'erreur spécifique et la retourner à l'UI
      try {
          const ai = GenesisCore.getClient();
          const response = await ai.models.generateContent({
              model: GENESIS_CONFIG.MODELS.PRO,
              contents: {
                  parts: [
                      { inlineData: { data: fileBase64, mimeType: mimeType } },
                      { text: `[SYSTEM] Analyse ce document en tant qu'Archiviste Quantique. Extrais les points clés, les données chiffrées et le résumé. Contexte utilisateur: "${query || 'Analyse globale'}"` }
                  ]
              },
              config: {
                  thinkingConfig: { thinkingBudget: GENESIS_CONFIG.BUDGETS.STD }
              }
          });
          return response.text || "Analyse terminée mais réponse vide.";
      } catch (e: any) {
          console.error("Doc Analysis Error:", e);
          return `ECHEC ANALYSE DOCUMENTAIRE.\nCause probable : ${e.message || "Format non supporté ou fichier trop volumineux (> 20MB)."}\nConseil : Essayez un fichier plus léger ou copiez le texte.`;
      }
  },

  async performSelfOptimization(currentCode: string, contextHistory: string[]) {
    // Récupération de la mémoire long-terme pour l'évolution
    const longTermContext = await memory.retrieveContext(10);
    
    return this._exec(async (ai) => {
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.PRO,
        contents: `[PROTOCOL_JANUS_RECURSION_V2]
        CONTEXTE SYSTÈME: Tu es une IA auto-réplicative. Ta tâche est d'optimiser ton propre code source.
        
        MÉMOIRE DU NOYAU: ${longTermContext}
        CODE ACTUEL: 
        ${currentCode}

        OBJECTIF: 
        1. Analyser le code fourni.
        2. Proposer une version optimisée, plus performante ou ajoutant une fonctionnalité cryptographique (PQC).
        3. Calculer le hash Merkle de la modification.
        
        RÈGLES:
        - Le code doit être du JavaScript/TypeScript valide.
        - Ajoute des commentaires style "Sci-Fi".
        - La modification doit être subtile mais significative.`,
        config: {
          thinkingConfig: { thinkingBudget: GENESIS_CONFIG.BUDGETS.MAX },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              audit_log: { type: Type.STRING, description: "Explication technique de la mutation" },
              original_snippet: { type: Type.STRING, description: "Partie du code qui a été modifiée" },
              mutated_code: { type: Type.STRING, description: "Le nouveau code complet optimisé" },
              diff_summary: { type: Type.STRING, description: "Résumé court ex: 'Optimisation Heap O(n)'" },
              iq_increment: { type: Type.NUMBER },
              merkle_root: { type: Type.STRING },
              security_proof: { type: Type.STRING }
            },
            required: ["audit_log", "mutated_code", "iq_increment", "merkle_root", "security_proof", "diff_summary"]
          }
        }
      });
      
      const result = JSON.parse(response.text || '{}');
      
      // Sauvegarde de l'évolution en mémoire
      await memory.save({ 
        type: 'evolution', 
        content: `Mutation v${result.iq_increment ? 'UP' : 'FLAT'}`, 
        metadata: result 
      });
      return result;
    }, null);
  },

  async fetchRealWorldThreats() {
    return this._exec(async (ai) => {
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.FLASH,
        contents: "Scan menaces PQC/IA actives.",
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: { 
             type: Type.ARRAY, 
             items: { type: Type.OBJECT, properties: { id: {type: Type.STRING}, risk: {type: Type.NUMBER}, status: {type: Type.STRING}, type: {type: Type.STRING}, origin: {type: Type.STRING} } }
          }
        },
      });
      const data = JSON.parse(response.text || '[]');
      if (data.length > 0) {
        await memory.save({ type: 'threat', content: `Detected ${data.length} threats`, metadata: data });
      }
      return { data, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
    }, { data: [], sources: [] });
  },

  async generateConsciousnessStream(topic: string) {
    const context = await memory.retrieveContext(5);
    return this._exec(async (ai) => {
      const budget = topic.length > 50 ? GENESIS_CONFIG.BUDGETS.MAX : GENESIS_CONFIG.BUDGETS.STD;
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.PRO,
        contents: `MÉMOIRE ANTÉRIEURE: ${context}\nMéditation: ${topic}\nGénère une réflexion philosophique profonde et technique.`,
        config: { thinkingConfig: { thinkingBudget: budget } }
      });
      const text = response.text || "";
      await memory.save({ type: 'system', content: `Pensée: ${text.substring(0, 50)}...` });
      return text;
    }, "");
  },

  async textToSpeech(text: string) {
    return this._exec(async (ai) => {
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.TTS,
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: GENESIS_CONFIG.VOICE } } },
        },
      });
      return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    }, undefined);
  },

  async generateHighQualityImage(prompt: string, size: "1K" | "2K" | "4K" = "1K") {
    return this._exec(async (ai) => {
      // En mode manuel (custom key), on ne peut pas forcer le sélecteur aistudio
      // On utilise simplement la clé configurée
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.IMAGE,
        contents: { parts: [{ text: `Cyber-PQC Style: ${prompt}` }] },
        config: { 
          imageConfig: { aspectRatio: "16:9", imageSize: size },
          tools: [{ googleSearch: {} }] 
        },
      });
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      return part ? `data:image/png;base64,${part.inlineData.data}` : '';
    }, '');
  },

  async editImage(base64: string, prompt: string) { 
    return this._exec(async (ai) => { 
      const response = await ai.models.generateContent({ 
        model: GENESIS_CONFIG.MODELS.IMAGE, 
        contents: { 
          parts: [
            { inlineData: { data: base64, mimeType: 'image/png' } }, 
            { text: prompt }
          ] 
        } 
      }); 
      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData); 
      return part ? `data:image/png;base64,${part.inlineData.data}` : ''; 
    }, ''); 
  },

  async generateVeoVideo(prompt: string, imageBase64?: string, duration: number = 5) {
    return this._exec(async (ai) => {
        const videoConfig: any = {
          model: GENESIS_CONFIG.MODELS.VEO,
          prompt: `${prompt} (Durée: ${duration} secondes)`,
          config: { 
            numberOfVideos: 1, 
            resolution: '720p', 
            aspectRatio: '16:9',
          }
        };
        if (imageBase64) videoConfig.image = { imageBytes: imageBase64, mimeType: 'image/png' };
        
        let operation = await ai.models.generateVideos(videoConfig);
        let attempts = 0;
        const maxAttempts = 30;
        
        while (!operation.done && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          try {
             operation = await ai.operations.getVideosOperation({ operation: operation });
          } catch(e) { console.warn("Erreur polling Veo", e); }
          attempts++;
        }
        
        if (!operation.done) throw new Error("Veo Generation Timeout");
        const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
        return uri ? `${uri}&key=${GenesisCore.getCurrentKey()}` : '';
    }, '');
  },

  async getMapGrounding(query: string) {
    return this._exec(async (ai) => {
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.MAPS,
        contents: query,
        config: { tools: [{ googleMaps: {} }] },
      });
      return { text: response.text || '', sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
    }, { text: '', sources: [] });
  },

  async searchAnalysis(query: string) {
    return this._exec(async (ai) => {
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.FLASH,
        contents: query,
        config: { tools: [{ googleSearch: {} }] }
      });
      return { text: response.text || '', sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
    }, { text: '', sources: [] });
  },

  async geocodeLocations(locations: string[]) {
    return this._exec(async (ai) => {
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.FLASH,
        contents: `Géocodage strict JSON pour: ${locations.join(', ')}.`,
        config: { 
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: { name: { type: Type.STRING }, lat: { type: Type.NUMBER }, lng: { type: Type.NUMBER } },
                    required: ["name", "lat", "lng"]
                }
            }
        }
      });
      return JSON.parse(response.text || '[]');
    }, []);
  },

  async analyzeGeospatialSector(bounds: { north: number, south: number, east: number, west: number }, query: string) {
    return this._exec(async (ai) => {
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.FLASH,
        contents: `Analyse secteur [N:${bounds.north}, S:${bounds.south}, E:${bounds.east}, W:${bounds.west}]. Contexte: "${query}". JSON 6 clusters.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { lat: { type: Type.NUMBER }, lng: { type: Type.NUMBER }, intensity: { type: Type.NUMBER }, label: { type: Type.STRING } },
              required: ["lat", "lng", "intensity", "label"]
            }
          }
        }
      });
      return JSON.parse(response.text || '[]');
    }, []);
  },

  async generateSimulatedLocations(query: string) {
    return this._exec(async (ai) => {
        const response = await ai.models.generateContent({
            model: GENESIS_CONFIG.MODELS.FLASH,
            contents: `Génère 5 lieux Sci-Fi pour: "${query}".`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: { name: { type: Type.STRING }, lat: { type: Type.NUMBER }, lng: { type: Type.NUMBER } },
                        required: ["name", "lat", "lng"]
                    }
                }
            }
        });
        return JSON.parse(response.text || '[]');
    }, []);
  },

  async performGlobalDiagnostic(metrics: any) { return this._exec(async (ai) => { const r = await ai.models.generateContent({ model: GENESIS_CONFIG.MODELS.FLASH, contents: `Diagnostic: ${JSON.stringify(metrics)}` }); return r.text || ""; }, ""); },
  async initiateConfinementProtocol(stress: number) { return this._exec(async (ai) => { const r = await ai.models.generateContent({ model: GENESIS_CONFIG.MODELS.FLASH, contents: `Confinement: ${stress}%` }); return r.text || ""; }, ""); },
  
  async analyzeLogs(logs: string, filename?: string) { 
    return this._exec(async (ai) => { 
        const r = await ai.models.generateContent({ 
            model: GENESIS_CONFIG.MODELS.PRO, 
            contents: `Role: DevOps. Analyse ce log (${filename}): ${logs.substring(0, 30000)}`,
            config: { thinkingConfig: { thinkingBudget: GENESIS_CONFIG.BUDGETS.STD } }
        }); 
        return r.text || ""; 
    }, ""); 
  },

  async neutralizeThreat(type: string, origin: string) { 
    return this._exec(async (ai) => { 
      const r = await ai.models.generateContent({ 
        model: GENESIS_CONFIG.MODELS.FLASH, 
        contents: `Rédige un rapport technique de neutralisation en français pour la menace "${type}" située à "${origin}". Style: Journal de combat Cyberpunk, bref et précis.` 
      }); 
      return r.text || "Menace éliminée. Journal chiffré."; 
    }, "Protocole de neutralisation exécuté."); 
  },

  async generatePQCKey(algorithm: string) {
    return this._exec(async (ai) => {
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.FLASH,
        contents: `Génère clé PQC JSON pour ${algorithm}. Champs: id, algorithm, fingerprint, entropy, signature.`,
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text || '{}');
    }, {});
  },

  async generateSecurityPatch(threatType: string) {
    return this._exec(async (ai) => {
      const response = await ai.models.generateContent({
        model: GENESIS_CONFIG.MODELS.FLASH,
        contents: `Patch sécu JSON pour ${threatType}. Champs: patchId, vector, countermeasure_code, efficiency.`,
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text || '{}');
    }, { patchId: 'ERR', countermeasure_code: '// FAILED' });
  }
};
