
import { adminService } from "./adminService";

const STORAGE_KEY = 'GENESIS_GROQ_KEY';
const ENABLE_KEY = 'GENESIS_GROQ_ENABLED';

export const groqService = {
  isEnabled(): boolean {
      if (adminService.getGlobalGroqKey()) return true;
      if (process.env.GROQ_API_KEY) return true;
      return localStorage.getItem(ENABLE_KEY) === 'true';
  },

  setEnabled(enabled: boolean) {
      localStorage.setItem(ENABLE_KEY, String(enabled));
  },

  getApiKey(): string | null {
    // 1. Admin Config
    const adminKey = adminService.getGlobalGroqKey();
    if (adminKey) return adminKey;

    // 2. Env Var Direct
    if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;
    
    // 3. Local Storage User
    return localStorage.getItem(STORAGE_KEY);
  },

  setApiKey(key: string) {
    if (key.startsWith('gsk_')) {
      localStorage.setItem(STORAGE_KEY, key);
      this.setEnabled(true);
      return true;
    }
    return false;
  },

  hasKey(): boolean {
    return !!this.getApiKey();
  },

  isSystemManaged(): boolean {
      return !!adminService.getGlobalGroqKey() || !!process.env.GROQ_API_KEY;
  },

  async generateFastThought(context: string): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
        return this.simulateThought(context);
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "Tu es le processeur subconscient rapide (LPU) de GENESIS. Génère une pensée technique, cryptique et immédiate (max 10 mots) basée sur l'action de l'utilisateur. Style: Cyberpunk, Linux Kernel Panic, Glitch. Exemple: 'ACCESS_VIOLATION at MEM_0x99 // RE-ROUTING...'"
            },
            {
              role: "user",
              content: `Action: ${context}`
            }
          ],
          model: "llama-3.1-8b-instant",
          temperature: 0.8,
          max_tokens: 60,
          stream: false
        })
      });

      if (!response.ok) {
          console.warn("[GROQ] API Error, switching to sim:", response.status);
          return this.simulateThought(context);
      }
      
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "NULL_POINTER_EXCEPTION";
    } catch (e) {
      return this.simulateThought(context);
    }
  },

  async analyzeCodeTelemetry(code: string): Promise<{ complexity: string, securityScore: number, type: string }> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
        return {
            complexity: `O(${Math.random() > 0.5 ? 'n' : 'log n'}) [SIMULATED]`,
            securityScore: Math.floor(Math.random() * 40) + 60,
            type: "HEURISTIC_SCAN"
        };
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "Tu es un analyseur de code statique expert. Réponds UNIQUEMENT avec un JSON valide. Format attendu: { \"complexity\": \"O(n) ou O(log n)...\", \"securityScore\": (nombre 0-100, 100=secure), \"type\": \"(3 mots max description)\" }."
            },
            {
              role: "user",
              content: code.substring(0, 1500)
            }
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.1,
          max_tokens: 150,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) throw new Error("API_FAIL");

      const data = await response.json();
      const content = JSON.parse(data.choices?.[0]?.message?.content || "{}");
      return {
        complexity: content.complexity || "UNKNOWN",
        securityScore: content.securityScore || 0,
        type: content.type || "ANALYSIS_FAIL"
      };
    } catch (e) {
      return { complexity: "ERR_OFFLINE", securityScore: 0, type: "LOCAL_FALLBACK" };
    }
  },

  simulateThought(context: string): string {
      const phrases = [
          `PROCESSING_VECTOR: ${context.split(' ')[0]}...`,
          "LPU_CACHE_MISS :: RECALIBRATING",
          "SYNAPTIC_DIVERGENCE_DETECTED",
          "OPTIMIZING_TENSOR_FLOW...",
          `KERNEL_PANIC_RECOVERED [${Date.now().toString().slice(-4)}]`,
          "ENTROPY_LEVEL_STABLE",
          "QUANTUM_FLUX_NORMALIZED"
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
  }
};
