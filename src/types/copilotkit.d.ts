
declare module '@copilotkit/react-core' {
  import { ReactNode } from 'react';
  
  export interface CopilotKitProps {
    publicApiKey: string;
    children: ReactNode;
  }
  
  export function CopilotKit(props: CopilotKitProps): JSX.Element;
  
  export interface UseCopilotChatResult {
    visibleMessages: any[];
    appendMessage: (message: any) => void;
    setMessages: (messages: any[]) => void;
    deleteMessage: (id: string) => void;
    reloadMessages: () => void;
    stopGeneration: () => void;
    isLoading: boolean;
  }
  
  export function useCopilotChat(): UseCopilotChatResult;
}

declare module '@copilotkit/react-ui' {
  import { ReactNode } from 'react';
  
  export interface CopilotTextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    className?: string;
    copilotProps?: Record<string, any>;
    children?: ReactNode;
  }
  
  export function CopilotTextarea(props: CopilotTextareaProps): JSX.Element;
}

declare module '@copilotkit/runtime-client-gql' {
  export enum Role {
    User = 'user',
    System = 'system',
    Assistant = 'assistant'
  }
  
  export class TextMessage {
    constructor(options: { content: string; role: Role });
  }
}
