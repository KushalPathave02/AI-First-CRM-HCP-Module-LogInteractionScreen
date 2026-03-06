import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addChatMessage, updateFullForm, setLoading } from '../redux/store';
import { Bot, MessageCircle, AlertCircle } from 'lucide-react';

const ChatAssistant = () => {
  const [input, setInput] = useState('');
  const chatHistory = useSelector((state) => state.interaction.chatHistory);
  const formData = useSelector((state) => state.interaction.formData);
  const loading = useSelector((state) => state.interaction.loading);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    dispatch(addChatMessage(userMessage));
    setInput('');
    dispatch(setLoading(true));

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${apiUrl}/api/chat`, {
        message: input,
        form_data: formData
      });

      dispatch(addChatMessage({ role: 'assistant', content: response.data.reply }));
      if (response.data.updated_form) {
        dispatch(updateFullForm(response.data.updated_form));
      }
    } catch (error) {
      console.error('Chat error:', error);
      dispatch(addChatMessage({ role: 'assistant', content: 'Sorry, I encountered an error processing your request.' }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="card h-full flex flex-col p-0">
      {/* Header */}
      <div className="px-6 py-5 border-b">
        <div className="flex items-center gap-2.5">
          <MessageCircle size={20} className="text-blue-600" />
          <h3 className="section-title mb-0 text-sm">AI Assistant</h3>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">Log interaction via chat</p>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/30 custom-scrollbar"
      >
        {chatHistory.length === 0 && (
          <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
              Log interaction details here (e.g., <span className="text-blue-600 italic">"Met Dr. Smith, discussed Product X efficacy"</span>)
            </p>
          </div>
        )}
        
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              <p className="text-[13px] leading-relaxed font-medium">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-6 border-t bg-white">
        <div className="flex flex-col gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
            placeholder="Describe interaction..."
            className="text-[13px] h-[100px] p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none shadow-sm"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white rounded-xl py-3 px-8 text-sm font-bold hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2 shadow-lg min-w-[120px] cursor-pointer"
            >
              <AlertCircle size={18} className="rotate-180" />
              Log Interaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
