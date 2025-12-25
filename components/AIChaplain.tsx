import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithChaplain, generateSpecificPrayer } from '../services/geminiService';
import { Send, User, MessageCircle, Sparkles, Loader2 } from 'lucide-react';

const AIChaplain: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hola, soy tu asistente espiritual. ¿En qué puedo ayudarte hoy? Puedes pedirme que rece por una intención específica, que te explique algo sobre la fe, o simplemente conversar.',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);

    // Format history for API
    const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
    }));

    // Call API
    // Check if it's a specific request for a new prayer generation or just chat
    let responseText = "";
    if (userText.toLowerCase().includes("escribe una oración") || userText.toLowerCase().includes("crea una oración")) {
         responseText = await generateSpecificPrayer(userText);
    } else {
         responseText = await chatWithChaplain(userText, history);
    }

    const newAiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newAiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-church-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm border-b border-church-100 flex items-center gap-3">
        <div className="bg-gold-100 p-2 rounded-full text-gold-600">
           <MessageCircle size={24} />
        </div>
        <div>
           <h1 className="text-xl font-serif font-bold text-church-800">Asistente Pastoral</h1>
           <p className="text-xs text-church-500">Impulsado por IA</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isUser ? 'bg-church-600 text-white' : 'bg-gold-500 text-white'
                }`}>
                  {isUser ? <User size={16} /> : <Sparkles size={16} />}
                </div>
                
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  isUser 
                    ? 'bg-church-600 text-white rounded-tr-none' 
                    : 'bg-white text-church-800 border border-church-100 rounded-tl-none font-serif'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-church-100 ml-10 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-church-400" />
                    <span className="text-xs text-church-400">Escribiendo...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-16 left-0 w-full bg-white border-t border-church-200 p-3 z-40 max-w-md mx-auto left-0 right-0">
        <div className="flex items-end gap-2 bg-church-50 border border-church-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-church-300 focus-within:bg-white transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe tu intención o pregunta..."
            className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-church-800 max-h-32 min-h-[44px] py-2.5 px-2 text-sm"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-xl flex-shrink-0 transition-all ${
              input.trim() && !isLoading
                ? 'bg-church-700 text-white hover:bg-church-800 shadow-md'
                : 'bg-church-200 text-church-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChaplain;