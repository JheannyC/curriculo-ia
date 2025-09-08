import React from "react";

interface AIEnhanceButtonProps {
  onEnhance: () => void;   
  loading?: boolean;
}

const AIEnhanceButton: React.FC<AIEnhanceButtonProps> = ({ onEnhance, loading }) => {
  return (
    <button
      type="button"
      onClick={onEnhance}
      disabled={loading}
      className={`px-3 py-2 text-sm rounded text-white transition
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
    >
      {loading ? "..." : "✨ Melhorar"}
    </button>
  );
};

export default AIEnhanceButton;