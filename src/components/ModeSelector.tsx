import { Button } from '@/components/ui/button';
import { Zap, Database } from 'lucide-react';

interface ModeSelectorProps {
  mode: 'gemini' | 'offline';
  onModeChange: (mode: 'gemini' | 'offline') => void;
}

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Mode:</span>
      <Button
        variant={mode === 'gemini' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onModeChange('gemini')}
        className="h-8"
      >
        <Zap className="w-4 h-4 mr-1" />
        Gemini AI
      </Button>
      <Button
        variant={mode === 'offline' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onModeChange('offline')}
        className="h-8"
      >
        <Database className="w-4 h-4 mr-1" />
        Offline Demo
      </Button>
    </div>
  );
};