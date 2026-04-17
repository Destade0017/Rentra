import React from 'react';
import { cn } from '../../utils/cn.js';
import { Check, CheckCheck } from 'lucide-react';

export default function MessageBubble({ message, isLast }) {
  const isLandlord = message.sender === 'landlord';

  return (
    <div className={cn(
      "flex flex-col max-w-[70%]",
      isLandlord ? "ml-auto items-end" : "mr-auto items-start"
    )}>
      <div className={cn(
        "px-5 py-3.5 rounded-[24px] text-sm font-medium shadow-sm transition-all relative group",
        isLandlord 
          ? "bg-brand-500 text-white rounded-tr-none" 
          : "bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-slate-200/50"
      )}>
        {message.text}
        
        {/* Floating Timestamp on Hover */}
        <div className={cn(
            "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-2 py-1 bg-slate-800 text-white text-[9px] font-bold rounded pointer-events-none z-20",
            isLandlord ? "right-full mr-2" : "left-full ml-2"
        )}>
            {message.time}
        </div>
      </div>

      <div className={cn(
        "flex items-center gap-1.5 mt-1.5 px-1",
        isLandlord ? "flex-row-reverse" : ""
      )}>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{message.time}</span>
        {isLandlord && (
            <div className="flex text-brand-400">
                <CheckCheck size={12} strokeWidth={3} />
            </div>
        )}
      </div>
    </div>
  );
}
