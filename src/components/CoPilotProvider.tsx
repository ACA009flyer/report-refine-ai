
import React from "react";
import { CopilotKit } from "@copilotkit/react-core";

export const CoPilotProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <CopilotKit publicApiKey="ck_pub_16098ba03127d42d2b4a38dea6995a89">
      {children}
    </CopilotKit>
  );
};

export const CoPilotTextareaField = ({ 
  value, 
  onChange, 
  placeholder, 
  rows = 10, 
  className = "", 
  copilotProps = {},
  onAnalyze = () => {}
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  copilotProps?: Record<string, any>;
  onAnalyze?: (text: string) => void;
}) => {
  // Create a textarea with basic AI enhancement functionality
  const [analyzing, setAnalyzing] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Set typing indicator and clear previous timeout
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set a new timeout to detect when typing has stopped
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      // If there's substantial content, trigger analysis
      if (newValue.length > 100) {
        onAnalyze(newValue);
      }
    }, 1500);
  };

  const handleAnalyzeClick = () => {
    if (value && value.length > 0) {
      setAnalyzing(true);
      onAnalyze(value);
      setTimeout(() => setAnalyzing(false), 1000);
    }
  };

  return (
    <div className="relative">
      <textarea
        className={`w-full border border-gray-300 rounded-md p-2 ${className}`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder || "Enter text here..."}
        rows={rows}
      />
      <div className="absolute bottom-2 right-2 flex items-center gap-2">
        {isTyping && (
          <span className="text-xs text-gray-500">Waiting for input...</span>
        )}
        <button
          onClick={handleAnalyzeClick}
          className="bg-blue-800 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
          disabled={analyzing || !value}
        >
          {analyzing ? "Analyzing..." : "Enhance with AI"}
        </button>
      </div>
    </div>
  );
};
