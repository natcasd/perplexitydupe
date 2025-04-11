import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Settings } from "lucide-react"

interface SettingsDialogProps {
  numResults: number;
  setNumResults: (value: number) => void;
  enableScraping: boolean;
  setEnableScraping: (value: boolean) => void;
  enableQueryRewrite: boolean;
  setEnableQueryRewrite: (value: boolean) => void;
  model: string;
  setModel: (value: string) => void;
}

export function SettingsDialog({
  numResults,
  setNumResults,
  enableScraping,
  setEnableScraping,
  enableQueryRewrite,
  setEnableQueryRewrite,
  model,
  setModel,
}: SettingsDialogProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-lg h-[52px] w-[52px]">
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" side="bottom" align="center">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Search Settings</h4>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="num-results">Number of Results</Label>
              <Slider
                id="num-results"
                min={1}
                max={10}
                step={1}
                value={[numResults]}
                onValueChange={(value) => setNumResults(value[0])}
              />
              <div className="text-sm text-muted-foreground text-right">
                {numResults} results
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-scraping">Enable Website Scraping</Label>
              <Switch
                id="enable-scraping"
                checked={enableScraping}
                onCheckedChange={setEnableScraping}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-query-rewrite">Enable Query Rewriting</Label>
              <Switch
                id="enable-query-rewrite"
                checked={enableQueryRewrite}
                onCheckedChange={setEnableQueryRewrite}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="model">Model</Label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
              </select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 