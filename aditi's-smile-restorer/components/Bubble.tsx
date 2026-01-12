import React from 'react';
import { Message } from '../types';
import { User, Bot, Volume2 } from 'lucide-react';

interface BubbleProps {
  message: Message;
  onPlayAudio: (text: string, id: string) => void;
  isPlaying: boolean;
}

export const Bubble: React.FC<BubbleProps> = ({ message, onPlayAudio, isPlaying }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-indigo-500' : 'bg-pink-500'}`}>
          {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
        </div>
        
        <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base relative group
          ${isUser 
            ? 'bg-indigo-600 text-white rounded-br-none' 
            : 'bg-white text-gray-800 border border-pink-100 rounded-bl-none'
          }`}
        >
          <p className="leading-relaxed">{message.text}</p>
          
          {!isUser && (
            <button 
              onClick={() => onPlayAudio(message.text, message.id)}
              className={`absolute -right-8 bottom-0 p-1.5 rounded-full transition-colors ${isPlaying ? 'text-pink-600 bg-pink-50 animate-pulse' : 'text-gray-400 hover:text-pink-500 hover:bg-pink-50'}`}
              title="Read aloud"
            >
              <Volume2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};