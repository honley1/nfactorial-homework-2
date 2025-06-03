import { useState, useEffect, useRef } from "react";
import { sendToGemini } from "../../shared/api/gemini";

type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const aiText = await sendToGemini(userMessage.text);

    const aiMessage: Message = {
      id: Date.now() + 1,
      sender: "ai",
      text: aiText,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Автоскролл вниз
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="flex flex-col h-screen flex-1 bg-gradient-to-br from-gray-50 to-white">
      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-3 max-w-[70%] text-sm rounded-2xl shadow-md whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 bg-gray-100 text-sm text-gray-500 rounded-2xl shadow">
              Идёт генерация ответа...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex items-center gap-3 shadow-inner">
        <input
            type="text"
            placeholder="Введите сообщение..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 disabled:opacity-50 transition-all"
        >
            Отправить
        </button>
        </div>
    </section>
  );
};
