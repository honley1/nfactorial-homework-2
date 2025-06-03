import { FaRobot } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <aside className="w-80 h-screen bg-white border-r border-gray-200 shadow-md flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Чат с AI</h2>
      </div>

      {/* Single Chat Item */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center px-4 py-4 hover:bg-gray-100 cursor-pointer transition">
          <FaRobot className="text-blue-500 w-6 h-6 mr-3" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">AI Assistant</span>
            <span className="text-xs text-gray-500">Ваш AI-помощник</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
