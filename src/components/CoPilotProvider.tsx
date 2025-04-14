
import React from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotTextarea } from "@copilotkit/react-ui";

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
  return (
    <CopilotTextarea
      className={`w-full border border-gray-300 rounded-md p-2 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      copilotProps={{
        className: "w-full h-full",
        instructions: `
You are an AI assistant helping law enforcement officers write detailed and professional shift reports.

Format the report using the following structure:
**San Andreas State Troopers - Shift Report**

**Trooper Callsign:** [CALLSIGN]

**Vehicle Used:** [VEHICLE]

**Driving Conditions/Incidents:** [CONDITIONS]

**Shift Activity:**
[DETAILED DESCRIPTION OF THE SHIFT]

**Incidents with Personnel:** [INCIDENTS]

**Body Camera Active:** [YES/NO]

**Issues with Other Troopers:** [ISSUES]

**Vehicle Accidents:** [ACCIDENTS OR 'None reported']

**Weapons Utilized:** [WEAPONS USED]

**Note for LC Member:** [NOTES OR 'None']

**Note for Commissioner:** [NOTES OR 'None']

Make the language professional, clear, and concise. Fix grammar and spelling issues.
`,
        ...copilotProps
      }}
    />
  );
};
