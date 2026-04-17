import React, { useRef, useEffect } from 'react';
import { Phone, Video, Info, MoreVertical } from 'lucide-react';
import MessageBubble from './MessageBubble.jsx';
import MessageInput from './MessageInput.jsx';

export default function ChatWindow({ conversation }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
            <img src={conversation.avatar} alt={conversation.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{conversation.name}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{conversation.property}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all border border-transparent hover:border-brand-100">
                <Phone size={18} />
            </button>
            <button className="p-2.5 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all border border-transparent hover:border-brand-100">
                <Video size={18} />
            </button>
            <div className="w-px h-6 bg-slate-100 mx-2" />
            <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                <Info size={18} />
            </button>
            <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                <MoreVertical size={18} />
            </button>
        </div>
      </div>

      {/* Message Thread */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth bg-slate-50/20"
      >
        {conversation.messages.length > 0 ? (
          conversation.messages.map((msg, idx) => (
            <MessageBubble key={msg.id} message={msg} isLast={idx === conversation.messages.length - 1} />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
             <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                <MessageVertical size={20} />
             </div>
             <p className="text-sm text-slate-400 font-medium">No previous messages. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Typing Indicator & Input */}
      <div className="px-8 py-6 bg-white border-t border-slate-100">
         <div className="mb-3 px-1 flex items-center gap-2">
            <div className="flex gap-1">
                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{conversation.name} is typing...</span>
         </div>
         <MessageInput />
      </div>
    </div>
  );
}

const MessageVertical = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
