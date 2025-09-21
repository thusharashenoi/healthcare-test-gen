import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, PlayCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Requirement {
  req_id: string;
  title: string;
  text: string;
}

interface RequirementsListProps {
  requirements: Requirement[];
  onGenerateTestCase: (requirement: Requirement) => void;
  generatingFor?: string | null;
  generatedTestCases: Set<string>;
}

export const RequirementsList = ({ 
  requirements, 
  onGenerateTestCase, 
  generatingFor,
  generatedTestCases 
}: RequirementsListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Requirements ({requirements.length})</h3>
        </div>
        <Badge variant="secondary">
          {requirements.slice(0, 5).length} of {requirements.length} shown
        </Badge>
      </div>

      <div className="grid gap-4">
        {requirements.slice(0, 5).map((req) => {
          const isGenerating = generatingFor === req.req_id;
          const hasGenerated = generatedTestCases.has(req.req_id);
          
          return (
            <Card 
              key={req.req_id} 
              className={cn(
                "p-6 transition-all duration-300 hover:shadow-card animate-slide-up",
                isGenerating && "ring-2 ring-primary/50"
              )}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {req.req_id}
                      </Badge>
                      {hasGenerated && (
                        <Badge variant="default" className="bg-success text-success-foreground">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Generated
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-medium text-foreground leading-relaxed">
                      {req.text}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-card-border">
                  <div className="text-xs text-muted-foreground">
                    Healthcare requirement • Click to generate test case
                  </div>
                  
                  <Button
                    variant={hasGenerated ? "secondary" : "default"}
                    size="sm"
                    onClick={() => onGenerateTestCase(req)}
                    disabled={isGenerating}
                    className={cn(
                      "transition-all duration-300",
                      isGenerating && "animate-pulse-subtle"
                    )}
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : hasGenerated ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Regenerate
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Generate Test Case
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {requirements.length > 5 && (
        <Card className="p-4 border-dashed">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              Showing first 5 requirements. Total: {requirements.length}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};