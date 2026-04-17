import React, { useState } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import ConversationList from '../components/messages/ConversationList.jsx';
import ChatWindow from '../components/messages/ChatWindow.jsx';

const mockConversations = [
  {
    id: 1,
    name: 'Sarah Williams',
    property: 'Royal Heritage Tower A4',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: 'I have confirmed the maintenance schedule for Monday.',
    time: '12:45 PM',
    unread: 2,
    online: true,
    messages: [
      { id: 1, text: 'Hello, regarding the plumbing in A4.', sender: 'tenant', time: '10:00 AM' },
      { id: 2, text: 'Received. We have dispatched a technician for today.', sender: 'landlord', time: '10:05 AM' },
      { id: 3, text: 'Perfect. I will be available from 2 PM onwards.', sender: 'tenant', time: '10:06 AM' },
      { id: 4, text: 'Noted. Our team will arrive by 2:15 PM.', sender: 'landlord', time: '10:10 AM' },
      { id: 5, text: 'I have confirmed the maintenance schedule for Monday.', sender: 'tenant', time: '12:45 PM' },
    ]
  },
  {
    id: 2,
    name: 'David Smith',
    property: 'Zenith Workspace B12',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    lastMessage: 'The contract extension has been signed.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: 'Good morning David. The document has been uploaded.', sender: 'landlord', time: 'Yesterday' },
      { id: 2, text: 'Thank you. The contract extension has been signed.', sender: 'tenant', time: 'Yesterday' },
    ]
  }
];

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(mockConversations[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-[calc(100vh-160px)] flex bg-white rounded-[48px] shadow-elevated overflow-hidden border border-slate-200/40 animate-subtle-fade">
      {/* Left Panel: Conversation List */}
      <div className="w-80 lg:w-96 border-r border-slate-100 flex flex-col bg-slate-50/20">
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-black text-brand-500 tracking-tight">Dialogues</h1>
            <div className="w-8 h-8 rounded-full bg-brand-500/5 flex items-center justify-center">
                <MessageSquare size={14} className="text-brand-500" />
            </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Locate dialogue..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200/60 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-accent-500/5 focus:border-accent-400/50 shadow-premium transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8 scrollbar-none mt-4">
          <ConversationList 
             conversations={mockConversations.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))}
             selectedId={selectedChat?.id}
             onSelect={setSelectedChat}
          />
        </div>
      </div>

      {/* Right Panel: Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <ChatWindow conversation={selectedChat} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white">
            <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-100 mb-8 border border-dashed border-slate-200">
              <MessageSquare size={48} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Select a Dialogue</h3>
            <p className="text-slate-400 text-sm max-w-xs mt-3 font-semibold leading-relaxed">Choose a resident from your registry to initiate secure communication.</p>
          </div>
        )}
      </div>
    </div>
  );
}
