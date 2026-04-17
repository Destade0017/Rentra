import React, { useState } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';

export default function MessageInput() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    // Mock send
    setText('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-2 rounded-2xl focus-within:ring-2 focus-within:ring-brand-500/10 focus-within:border-brand-500 transition-all shadow-inner"
    >
      <div className="flex items-center gap-1 pl-2">
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Paperclip size={20} />
          </button>
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors hidden sm:block">
            <Smile size={20} />
          </button>
      </div>

      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a message to your tenant..."
        className="flex-1 bg-transparent border-none py-3 text-sm font-medium focus:outline-none placeholder:text-slate-400"
      />

      <div className="flex items-center gap-2 pr-1">
          <button type="button" className="p-2.5 text-slate-400 hover:text-slate-600 transition-colors">
            <Mic size={20} />
          </button>
          <button 
            type="submit"
            disabled={!text.trim()}
            className="p-3 bg-brand-500 text-white rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-600 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Send size={18} strokeWidth={2.5} />
          </button>
      </div>
    </form>
  );
}
