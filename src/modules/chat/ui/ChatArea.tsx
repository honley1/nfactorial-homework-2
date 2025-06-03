import React, { useRef, useEffect } from "react";
import { Chat, Message } from "../../../shared/model/types";

interface ChatAreaProps {
  chat: Chat | null;
  onSend: (text: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chat, onSend }) => {
  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  if (!chat) {
    return <div className="flex-1 flex items-center justify-center text-gray-400">Выберите чат</div>;
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <div className="font-medium">{chat.name}</div>
          <div className="text-xs text-gray-400 flex items-center gap-2">
            {chat.online && <span className="w-3 h-3 bg-green-500 rounded-full border-2 border-white inline-block" />} {chat.online ? "онлайн" : "офлайн"}
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50">
        {chat.messages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`my-2 flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm text-sm ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-white text-gray-900 rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form
        className="bg-white border-t border-gray-200 px-4 py-3 flex gap-2"
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            onSend(input);
            setInput("");
          }
        }}
      >
        <textarea
          className="flex-1 resize-none border rounded px-3 py-2"
          rows={1}
          placeholder="Введите сообщение..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 disabled:opacity-50"
          disabled={!input.trim()}
        >
          Отправить
        </button>
      </form>
    </div>
  );
}; 