
import React from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotTextarea } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";

interface CoPilotProviderWrapperProps {
  children: React.ReactNode;
}

export const CoPilotProviderWrapper = ({ children }: CoPilotProviderWrapperProps) => {
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
