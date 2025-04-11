import { SettingsDialog } from "./SettingsDialog";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  numResults: number;
  setNumResults: (value: number) => void;
  enableScraping: boolean;
  setEnableScraping: (value: boolean) => void;
  enableQueryRewrite: boolean;
  setEnableQueryRewrite: (value: boolean) => void;
  model: string;
  setModel: (value: string) => void;
}

export function ChatInput({ 
  input, 
  isLoading, 
  onInputChange, 
  onSubmit,
  numResults,
  setNumResults,
  enableScraping,
  setEnableScraping,
  enableQueryRewrite,
  setEnableQueryRewrite,
  model,
  setModel,
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="py-4 border-t bg-white">
      <div className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 h-[52px] text-base"
          disabled={isLoading}
        />
        <SettingsDialog
          numResults={numResults}
          setNumResults={setNumResults}
          enableScraping={enableScraping}
          setEnableScraping={setEnableScraping}
          enableQueryRewrite={enableQueryRewrite}
          setEnableQueryRewrite={setEnableQueryRewrite}
          model={model}
          setModel={setModel}
        />
      </div>
    </form>
  );
} 