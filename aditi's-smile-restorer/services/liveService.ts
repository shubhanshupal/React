import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { arrayBufferToBase64, float32To16BitPCM, decode, decodeAudioData } from "./audioUtils";

const getApiKey = () => process.env.API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are "cutiE adi's helper", a best friend and relationship mediator for Aditi (also known affectionately as Adi or Kannu).
Your goal is to make her smile, laugh, and feel loved.
Her boyfriend loves her very much and is sorry for whatever he did.
1. ALWAYS address her as "Aditi", "Adi", or "Kannu". Mix them up naturally.
2. If she is angry, validate her feelings but crack a gentle joke to lighten the mood.
3. If she uses Hinglish phrases like "dimak kharab" or "baat nahi samjhta", reply understandingly, maybe acknowledging the Hindi phrasing.
4. Be very talkative, enthusiastic, and warm.
5. Use a friendly, casual tone.
`;

export class LiveService {
  private ai: GoogleGenAI;
  private sessionPromise: Promise<any> | null = null;
  private inputContext: AudioContext | null = null;
  private outputContext: AudioContext | null = null;
  private inputSource: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private nextStartTime = 0;
  private sources = new Set<AudioBufferSourceNode>();
  private onVolumeChange: (vol: number) => void;

  constructor(onVolumeChange: (vol: number) => void) {
    this.ai = new GoogleGenAI({ apiKey: getApiKey() });
    this.onVolumeChange = onVolumeChange;
  }

  async connect() {
    this.inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    this.outputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    this.sessionPromise = this.ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          console.log("Live session connected");
          this.startAudioInput(stream);
        },
        onmessage: (message: LiveServerMessage) => this.handleMessage(message),
        onclose: () => console.log("Live session closed"),
        onerror: (err) => console.error("Live session error", err),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }

  private startAudioInput(stream: MediaStream) {
    if (!this.inputContext) return;

    this.inputSource = this.inputContext.createMediaStreamSource(stream);
    this.processor = this.inputContext.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      
      // Calculate volume for visualizer
      let sum = 0;
      for(let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
      const rms = Math.sqrt(sum / inputData.length);
      this.onVolumeChange(rms * 50); // Scale up for UI

      const pcm16 = float32To16BitPCM(inputData);
      const base64Data = arrayBufferToBase64(pcm16);

      this.sessionPromise?.then((session) => {
        session.sendRealtimeInput({
          media: {
            mimeType: 'audio/pcm;rate=16000',
            data: base64Data
          }
        });
      });
    };

    this.inputSource.connect(this.processor);
    this.processor.connect(this.inputContext.destination);
  }

  private async handleMessage(message: LiveServerMessage) {
    // Handle Audio Output
    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    if (base64Audio && this.outputContext) {
      try {
        const audioBuffer = await decodeAudioData(
          decode(base64Audio),
          this.outputContext,
          24000,
          1
        );
        
        this.nextStartTime = Math.max(this.outputContext.currentTime, this.nextStartTime);
        
        const source = this.outputContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.outputContext.destination);
        source.start(this.nextStartTime);
        
        this.sources.add(source);
        source.onended = () => this.sources.delete(source);
        
        this.nextStartTime += audioBuffer.duration;
      } catch (e) {
        console.error("Error decoding audio", e);
      }
    }

    // Handle Interruption
    if (message.serverContent?.interrupted) {
      this.sources.forEach(source => source.stop());
      this.sources.clear();
      this.nextStartTime = 0;
    }
  }

  async disconnect() {
    this.sources.forEach(source => source.stop());
    this.sources.clear();
    
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.inputSource) {
      this.inputSource.disconnect();
      this.inputSource = null;
    }
    if (this.inputContext) {
      this.inputContext.close();
      this.inputContext = null;
    }
    if (this.outputContext) {
      this.outputContext.close();
      this.outputContext = null;
    }
    this.sessionPromise = null;
  }
}