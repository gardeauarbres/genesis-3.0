
// MOTEUR AUDIO PROCÉDURAL (Web Audio API)
class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private hasInitialized: boolean = false;

  private init() {
    if (this.hasInitialized) return;
    
    try {
        const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
        if (AudioContextClass) {
            this.ctx = new AudioContextClass();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.15; // Volume global doux
            this.masterGain.connect(this.ctx.destination);
            this.hasInitialized = true;
        }
    } catch (e) {
        console.warn("AudioContext non supporté ou bloqué.");
    }
  }

  private async resumeIfNeeded() {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
          try {
              await this.ctx.resume();
          } catch(e) {
              // Ignorer si l'interaction utilisateur n'a pas encore eu lieu
          }
      }
  }

  playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.1) {
    this.resumeIfNeeded();
    if (!this.ctx || !this.masterGain) return;

    try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  }

  // Son de validation (Succès)
  playConfirm() {
    this.playTone(800, 'sine', 0.1);
    setTimeout(() => this.playTone(1200, 'sine', 0.2), 50);
  }

  // Son d'erreur / Alerte
  playAlert() {
    this.playTone(150, 'sawtooth', 0.3);
    setTimeout(() => this.playTone(120, 'sawtooth', 0.3), 100);
  }

  // Son d'activation UI (Hover/Click)
  playBlip() {
    this.playTone(2000, 'sine', 0.05);
  }

  // Son de traitement de données (Typing)
  playData() {
    this.playTone(400 + Math.random() * 200, 'square', 0.03);
  }
  
  // Ambiance de fond (Drone) - À appeler une seule fois
  startDrone() {
     this.resumeIfNeeded();
     if (!this.ctx || !this.masterGain) return;
     try {
         const osc = this.ctx.createOscillator();
         const gain = this.ctx.createGain();
         osc.frequency.value = 40; // Basse fréquence
         gain.gain.value = 0.02;
         osc.connect(gain);
         gain.connect(this.masterGain);
         osc.start();
     } catch(e) {}
  }
}

export const sfx = new AudioEngine();
