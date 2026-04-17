import React from 'react';
import { cn } from '../../utils/cn.js';

export default function ConversationList({ conversations, selectedId, onSelect }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-2 mb-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Chats</span>
        <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {conversations.length}
        </span>
      </div>
      
      {conversations.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelect(chat)}
          className={cn(
            "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group relative",
            selectedId === chat.id 
              ? "bg-white shadow-lg shadow-slate-200/50 border border-slate-100" 
              : "hover:bg-white hover:shadow-md hover:shadow-slate-200/30 text-slate-500"
          )}
        >
          {/* Avatar with Status */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-sm">
                <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
            </div>
            {chat.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
            )}
          </div>

          {/* Details */}
          <div className="flex-1 text-left overflow-hidden">
            <div className="flex justify-between items-baseline mb-0.5">
              <h4 className={cn(
                "font-bold text-sm truncate",
                selectedId === chat.id ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
              )}>
                {chat.name}
              </h4>
              <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{chat.time}</span>
            </div>
            <p className={cn(
              "text-xs truncate font-medium",
              chat.unread > 0 ? "text-slate-900 font-bold" : "text-slate-400"
            )}>
              {chat.lastMessage}
            </p>
          </div>

          {/* Unread Badge */}
          {chat.unread > 0 && selectedId !== chat.id && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-brand-200 ring-2 ring-white">
              {chat.unread}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
