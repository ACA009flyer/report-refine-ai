
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
  copilotProps = {}
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  copilotProps?: Record<string, any>;
}) => {
  // Since we can't use CopilotTextarea, we'll create a simple textarea with similar functionality
  return (
    <textarea
      className={`w-full border border-gray-300 rounded-md p-2 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Enter text here..."}
      rows={rows}
    />
  );
};
