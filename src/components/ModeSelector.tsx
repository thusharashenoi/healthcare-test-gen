import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Database, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModeSelectorProps {
  mode: 'gemini' | 'offline';
  onModeChange: (mode: 'gemini' | 'offline') => void;
}

export const ModeSelector = ({ mode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Generation Mode</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={cn(
            "p-6 cursor-pointer transition-all duration-300 hover:shadow-card",
            mode === 'gemini' && "ring-2 ring-primary bg-primary/5"
          )}
          onClick={() => onModeChange('gemini')}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Gemini AI (Live)</h4>
              </div>
              <Badge variant={mode === 'gemini' ? 'default' : 'secondary'}>
                AI-Powered
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate test cases using Google's Gemini AI model for intelligent, context-aware results.
            </p>
            <div className="flex items-center space-x-1 text-xs text-success">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Real-time generation</span>
            </div>
          </div>
        </Card>

        <Card 
          className={cn(
            "p-6 cursor-pointer transition-all duration-300 hover:shadow-card",
            mode === 'offline' && "ring-2 ring-primary bg-primary/5"
          )}
          onClick={() => onModeChange('offline')}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Offline Demo</h4>
              </div>
              <Badge variant={mode === 'offline' ? 'default' : 'secondary'}>
                Sample Data
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Use pre-generated sample test cases for demonstration and testing purposes.
            </p>
            <div className="flex items-center space-x-1 text-xs text-warning">
              <div className="w-2 h-2 bg-warning rounded-full" />
              <span>Limited to samples</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};