import React, { useState, useEffect, useRef } from 'react';
import { Heart, Volume2, Sparkles, Phone, PhoneOff } from 'lucide-react';
import { Message, Mood } from './types';
import { generateTextResponse, fetchSpeechBase64 } from './services/geminiService';
import { decode, decodeAudioData } from './services/audioUtils';
import { LiveService } from './services/liveService';
import { Bubble } from './components/Bubble';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: "Hi Adi! 🌸 I'm cutiE adi's helper. Your boyfriend is super sorry and misses your smile. Click the green phone to talk to me!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  
  // Live API State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [liveVolume, setLiveVolume] = useState(0);
  const liveServiceRef = useRef<LiveService | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clean up Live Service on unmount
  useEffect(() => {
    return () => {
      liveServiceRef.current?.disconnect();
    };
  }, []);

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playAudio = async (text: string, messageId: string) => {
    initAudioContext();
    if (!audioContextRef.current) return;

    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      setPlayingMessageId(null);
    }

    if (playingMessageId === messageId) return;

    setPlayingMessageId(messageId);
    
    try {
      const base64 = await fetchSpeechBase64(text);
      if (!base64) {
        setPlayingMessageId(null);
        return;
      }

      const audioBuffer = await decodeAudioData(
        decode(base64),
        audioContextRef.current,
        24000,
        1
      );

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => setPlayingMessageId(null);
      source.start();
      audioSourceRef.current = source;
    } catch (e) {
      console.error("Playback error", e);
      setPlayingMessageId(null);
    }
  };

  // Helper to inject user actions into chat history for context
  const handleMoodAction = async (displayText: string, hiddenPrompt: string) => {
    initAudioContext();
    if (isLiveActive) return; // In live mode, we don't do text chat

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: displayText
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const responseText = await generateTextResponse(messages, hiddenPrompt);
      const botMessageId = (Date.now() + 1).toString();
      const botMessage: Message = {
        id: botMessageId,
        role: 'assistant',
        text: responseText
      };

      setMessages(prev => [...prev, botMessage]);

      if (isVoiceMode) {
        playAudio(responseText, botMessageId);
      }

    } catch (error) {
      console.error("Error in chat loop", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodClick = (mood: Mood) => {
    let prompt = "";
    let displayText = "";

    switch (mood) {
      case Mood.Angry:
        displayText = "I'm really angry right now 😠";
        prompt = "I am feeling very Angry at my boyfriend. Please calm me down with a joke or empathy.";
        break;
      case Mood.Sad:
        displayText = "I feel sad 😢";
        prompt = "I am feeling Sad. Tell me something sweet to make me smile.";
        break;
      case Mood.Neutral:
        displayText = "I'm okay, just bored 😐";
        prompt = "I am feeling Neutral. Entertain me!";
        break;
      case Mood.Happy:
        displayText = "I'm happy! 😊";
        prompt = "I am feeling Happy! Let's celebrate.";
        break;
    }
    handleMoodAction(displayText, prompt);
  };

  const toggleLiveMode = async () => {
    initAudioContext();
    if (isLiveActive) {
      // Stop
      liveServiceRef.current?.disconnect();
      setIsLiveActive(false);
      setLiveVolume(0);
      
      // Add a system message to history
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        text: "Call ended. I'm always here if you need to talk more, Adi! ❤️"
      }]);

    } else {
      // Start
      try {
        if (!liveServiceRef.current) {
          liveServiceRef.current = new LiveService((vol) => setLiveVolume(vol));
        }
        await liveServiceRef.current.connect();
        setIsLiveActive(true);
      } catch (e) {
        console.error("Failed to start live mode", e);
        alert("Couldn't start voice mode. Please check microphone permissions.");
      }
    }
  };

  const suggestions = [
    "Vo meri baat nahi samjhta 😤",
    "Mera dimak kharab kardeta hai 🤯",
    "Tell me a joke to cheer me up 🤡",
    "Why is he like this? 🙄"
  ];

  return (
    <div className="flex flex-col h-screen bg-pink-50 overflow-hidden font-sans">
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-pink-100 p-4 shadow-sm z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-float">
            <Heart className="text-white fill-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-tight">Aditi's Companion</h1>
            <p className="text-xs text-pink-500 font-medium">CutiE Kannu Helper💘</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <button 
            onClick={() => setIsVoiceMode(!isVoiceMode)}
            className={`p-2.5 rounded-full transition-all ${isVoiceMode && !isLiveActive ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400'}`}
            title="Auto-read text responses"
          >
            {isVoiceMode ? <Volume2 size={20} /> : <Volume2 size={20} className="opacity-50" />}
          </button>
        </div>
      </header>

      {/* Main Content Layer */}
      <div className="relative flex-1 flex flex-col overflow-hidden">
        
        {/* Chat List (Behind Live Overlay) */}
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide transition-opacity duration-300 ${isLiveActive ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
          <div className="max-w-3xl mx-auto flex flex-col gap-4 pb-20">
            {messages.map((msg) => (
              <Bubble 
                key={msg.id} 
                message={msg} 
                onPlayAudio={playAudio}
                isPlaying={playingMessageId === msg.id}
              />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-pink-400 text-sm ml-2 animate-pulse">
                <Sparkles size={16} />
                <span>Thinking of something sweet...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Live Call Overlay */}
        {isLiveActive && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="relative mb-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-rose-400 to-pink-600 flex items-center justify-center shadow-2xl animate-float">
                <Heart size={80} className="text-white fill-white" />
              </div>
              {/* Pulse Rings */}
              <div className="absolute inset-0 rounded-full border-4 border-pink-300/50 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div 
                className="absolute inset-[-20px] rounded-full border-4 border-pink-400/30 transition-all duration-75"
                style={{ transform: `scale(${1 + liveVolume * 0.15})` }}
              ></div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Listening to Kannu...</h2>
            <p className="text-gray-500 mb-2 animate-pulse text-lg">Tell me what's on your mind.</p>
            
            <div className="flex gap-4">
               <div className="h-16 w-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="h-24 w-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
               <div className="h-16 w-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            </div>
          </div>
        )}

        {/* Controls Area */}
        <div className="bg-white border-t border-pink-100 p-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
          <div className="max-w-md mx-auto space-y-4">

            {/* Mood Selector - Always visible unless in Live Mode */}
            {!isLiveActive && (
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-4 gap-3">
                  <button onClick={() => handleMoodClick(Mood.Angry)} disabled={isLoading} className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:bg-red-50 transition-colors group">
                    <span className="text-3xl group-hover:scale-110 transition-transform">😠</span>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-red-500">Angry</span>
                  </button>
                  <button onClick={() => handleMoodClick(Mood.Sad)} disabled={isLoading} className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:bg-blue-50 transition-colors group">
                    <span className="text-3xl group-hover:scale-110 transition-transform">😢</span>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500">Sad</span>
                  </button>
                  <button onClick={() => handleMoodClick(Mood.Neutral)} disabled={isLoading} className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:bg-gray-100 transition-colors group">
                    <span className="text-3xl group-hover:scale-110 transition-transform">😐</span>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-700">Meh</span>
                  </button>
                  <button onClick={() => handleMoodClick(Mood.Happy)} disabled={isLoading} className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:bg-yellow-50 transition-colors group">
                    <span className="text-3xl group-hover:scale-110 transition-transform">😊</span>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-yellow-600">Happy</span>
                  </button>
                </div>
              </div>
            )}

            {/* Big Main Call Button */}
            <div className="flex flex-col items-center justify-center gap-3">
              {isLiveActive ? (
                <button 
                  onClick={toggleLiveMode}
                  className="w-full py-5 bg-red-500 hover:bg-red-600 text-white rounded-3xl font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-red-200 transition-all active:scale-95"
                >
                  <PhoneOff size={28} />
                  Hang Up
                </button>
              ) : (
                <button 
                  onClick={toggleLiveMode}
                  className="w-full py-5 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-3xl font-bold text-xl flex items-center justify-center gap-3 shadow-xl shadow-green-200 transition-all active:scale-95 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <Phone size={28} className="animate-bounce" />
                  Tap to Talk to Me
                </button>
              )}
            </div>

            {/* Read-Only Suggestions (Voice Prompts) - Only visible when Live */}
            {isLiveActive && (
               <div className="mt-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Try saying...</p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestions.map((text, idx) => (
                      <div key={idx} className="text-center text-sm font-medium text-gray-600 bg-pink-50/50 py-2 px-3 rounded-lg border border-pink-100">
                        "{text}"
                      </div>
                    ))}
                  </div>
               </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}