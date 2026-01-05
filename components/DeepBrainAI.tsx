
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, Brain } from 'lucide-react';
import { askDeepBrainAI } from '../services/geminiService';
import { MOCK_RETREATS } from '../constants';

export const DeepBrainAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Namaste. I am the Deep Brain AI. I can help you navigate our 450+ global retreats. What are you seeking today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await askDeepBrainAI(userMsg, MOCK_RETREATS);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || "I am reflecting on your request. Could you rephrase?" }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[400px] h-[550px] rounded-3xl shadow-2xl border border-[#F0ECE4] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-[#7C9070] p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Deep Brain AI</h3>
                <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Zen Concierge</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FDFCF9]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-[#7C9070] text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#7C9070] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#7C9070] rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-[#7C9070] rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#F0ECE4]">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full bg-[#F9F6F1] border-none rounded-2xl py-4 pl-6 pr-12 text-sm focus:ring-2 focus:ring-[#7C9070]"
              />
              <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#7C9070] text-white p-2 rounded-xl">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#7C9070] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group relative"
        >
          <Brain className="w-8 h-8" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
            AI
          </div>
          <span className="absolute right-20 bg-white text-[#2D2D2D] px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Ask Deep Brain AI
          </span>
        </button>
      )}
    </div>
  );
};
