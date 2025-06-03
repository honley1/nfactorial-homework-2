import React, { useState } from "react";
import { Chat } from "../../../shared/model/types";

interface ChatListProps {
  chats: Chat[];
  onSelect: (chatId: string) => void;
  selectedChatId: string | null;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, onSelect, selectedChatId }) => {
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const people = filteredChats.filter(c => !c.isAI);
  const ai = filteredChats.filter(c => c.isAI);

  return (
    <aside className="bg-white border-r border-gray-200 w-80 flex flex-col">
      <div className="p-4">
        <input
          className="w-full px-3 py-2 border rounded"
          placeholder="Поиск по чатам"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 text-xs text-gray-400 mt-2">Люди</div>
        {people.map(chat => (
          <div
            key={chat.id}
            className={`p-3 cursor-pointer flex items-center gap-3 hover:bg-gray-100 ${selectedChatId === chat.id ? "bg-gray-100" : ""}`}
            onClick={() => onSelect(chat.id)}
          >
            <img src={chat.avatar} alt={chat.name} className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <div className="font-medium">{chat.name}</div>
              <div className="text-xs text-gray-400 truncate">{chat.lastMessage?.content}</div>
            </div>
            {chat.unreadCount > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{chat.unreadCount}</span>
            )}
          </div>
        ))}
        <div className="px-4 text-xs text-gray-400 mt-4">ИИ-ассистенты</div>
        {ai.map(chat => (
          <div
            key={chat.id}
            className={`p-3 cursor-pointer flex items-center gap-3 hover:bg-gray-100 ${selectedChatId === chat.id ? "bg-gray-100" : ""}`}
            onClick={() => onSelect(chat.id)}
          >
            <img src={chat.avatar} alt={chat.name} className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <div className="font-medium">{chat.name}</div>
              <div className="text-xs text-gray-400 truncate">{chat.lastMessage?.content}</div>
            </div>
            {chat.unreadCount > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">{chat.unreadCount}</span>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 flex gap-2">
        <button className="flex-1 bg-blue-500 text-white rounded px-3 py-2">+ Новый чат</button>
        <button className="flex-1 bg-green-500 text-white rounded px-3 py-2">+ Чат с ИИ</button>
      </div>
    </aside>
  );
}; 