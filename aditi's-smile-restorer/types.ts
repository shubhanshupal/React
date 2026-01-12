export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isAudioPlaying?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isVoiceMode: boolean;
}

export enum Mood {
  Angry = "Angry",
  Sad = "Sad",
  Neutral = "Neutral",
  Happy = "Happy"
}