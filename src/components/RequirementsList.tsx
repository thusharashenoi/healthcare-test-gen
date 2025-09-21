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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Requirements ({requirements.length})</h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {requirements.slice(0, 5).length} of {requirements.length}
        </Badge>
      </div>

      <div className="grid gap-3">
        {requirements.slice(0, 5).map((req) => {
          const isGenerating = generatingFor === req.req_id;
          const hasGenerated = generatedTestCases.has(req.req_id);
          
          return (
            <Card 
              key={req.req_id} 
              className={cn(
                "p-4 transition-all duration-300 animate-slide-up",
                isGenerating && "ring-1 ring-primary/50"
              )}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {req.req_id}
                      </Badge>
                      {hasGenerated && (
                        <Badge variant="default" className="bg-success text-success-foreground text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Done
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-foreground leading-relaxed">
                      {req.text}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    Click to generate test case
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
        <div className="text-center text-xs text-muted-foreground py-2">
          Showing first 5 of {requirements.length} requirements
        </div>
      )}
    </div>
  );
};