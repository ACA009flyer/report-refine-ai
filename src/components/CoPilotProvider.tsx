
import React from "react";
import { CopilotTextarea } from "@copilotkit/react-ui";
import { CopilotProvider as CopilotKitProvider } from "@copilotkit/react-core";

interface CoPilotProviderWrapperProps {
  children: React.ReactNode;
}

export const CoPilotProviderWrapper = ({ children }: CoPilotProviderWrapperProps) => {
  return (
    <CopilotKitProvider>
      {children}
    </CopilotKitProvider>
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
  return (
    <CopilotTextarea
      className={`w-full border border-gray-300 rounded-md p-2 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      copilotProps={{
        className: "w-full h-full",
        ...copilotProps
      }}
    />
  );
};
