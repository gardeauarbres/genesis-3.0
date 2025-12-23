
export type AppView = 'architecture' | 'lab' | 'visualizer' | 'search' | 'killswitch' | 'debugger' | 'consciousness' | 'map' | 'vault' | 'threats' | 'evolution' | 'fusion';

export interface EvolutionPatch {
  generation: number;
  timestamp: string;
  content: string;
  iqAtTime: number;
  merkleHash: string;
  validationProof: string;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'critical' | 'evolution' | 'audit';
}

export interface NeuralKey {
  id: string;
  algorithm: string;
  entropy: number;
  status: 'active' | 'revoked' | 'pending';
  signature: string;
}

export interface GroundingChunk {
  web?: { uri?: string; title?: string; };
  maps?: { uri?: string; title?: string; };
}

export interface TranscriptionEntry {
  role: 'user' | 'model';
  text: string;
}

export interface ThoughtNode {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: string[]; // IDs of connected nodes
  type: 'core' | 'inference' | 'memory';
  timestamp: number;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  executionTime: number;
  memoryUsage: number;
}

export interface ThreatTrajectory {
  id: string;
  originLabel: string;
  coordinates: [number, number][]; // Array of [lat, lng]
  riskLevel: number;
}

export interface AgentPersona {
  id: string;
  name: string;
  role: string;
  color: string;
  icon: string;
  description: string;
  systemPrompt: string;
}

// Extension globale pour les API Navigateur
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
