import { useState } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { ModeSelector } from '@/components/ModeSelector';
import { RequirementsList } from '@/components/RequirementsList';
import { TestCaseViewer } from '@/components/TestCaseViewer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Stethoscope, Brain, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { sampleTestCases } from '@/data/sampleTestCases';

const Index = () => {
  const [requirements, setRequirements] = useState<any[]>([]);
  const [mode, setMode] = useState<'gemini' | 'offline'>('offline');
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [currentTestCase, setCurrentTestCase] = useState<any | null>(null);
  const [generatedTestCases, setGeneratedTestCases] = useState<Set<string>>(new Set());

  const handleFileUpload = (reqs: any[]) => {
    setRequirements(reqs);
    setGeneratedTestCases(new Set());
    toast({
      title: "Requirements Uploaded",
      description: `Successfully processed ${reqs.length} requirements.`,
    });
  };

  const generateTestCase = async (requirement: any) => {
    setGeneratingFor(requirement.req_id);
    setCurrentTestCase(null);

    try {
      let testCase;
      
      if (mode === 'gemini') {
        // Simulate AI generation (would need Supabase for actual Gemini API)
        await new Promise(resolve => setTimeout(resolve, 2000));
        testCase = {
          test_case_id: `TC-${requirement.req_id.split('-')[1].padStart(3, '0')}`,
          req_id: requirement.req_id,
          title: `AI Generated test for ${requirement.req_id}`,
          test_steps: [
            { step: 1, action: "AI-generated test action", expected: "AI-generated expected result" }
          ],
          expected_results: "AI-generated comprehensive test results",
          data_profile: {
            fields: [{ name: "ai_field", type: "string" }],
            rows: 5,
            note: "AI-generated test data"
          },
          status: "pending_review"
        };
      } else {
        // Use offline samples
        testCase = sampleTestCases[requirement.req_id];
      }

      if (testCase) {
        setCurrentTestCase(testCase);
        setGeneratedTestCases(prev => new Set(prev).add(requirement.req_id));
        toast({
          title: "Test Case Generated",
          description: `Successfully generated test case for ${requirement.req_id}`,
        });
      } else {
        toast({
          title: "No Test Case Available",
          description: `No sample test case found for ${requirement.req_id}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate test case. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingFor(null);
    }
  };

  const saveTestCase = () => {
    if (currentTestCase) {
      toast({
        title: "Test Case Saved",
        description: `${currentTestCase.test_case_id} saved to database successfully.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Stethoscope className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">AI Test Case Generator</h1>
              <p className="text-sm text-muted-foreground">Healthcare Software POC</p>
            </div>
          </div>
          <ModeSelector mode={mode} onModeChange={setMode} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload & Requirements */}
          <div className="space-y-4">
            {/* AI Mode Notice */}
            {mode === 'gemini' && (
              <Alert className="border-warning bg-warning/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Live AI requires Supabase connection for Gemini API access.
                </AlertDescription>
              </Alert>
            )}

            {/* File Upload */}
            <FileUploader onFileUpload={handleFileUpload} />

            {/* Requirements List */}
            {requirements.length > 0 && (
              <RequirementsList
                requirements={requirements}
                onGenerateTestCase={generateTestCase}
                generatingFor={generatingFor}
                generatedTestCases={generatedTestCases}
              />
            )}

            {/* Empty State */}
            {requirements.length === 0 && (
              <Card className="p-8 text-center border-dashed border-2">
                <div className="space-y-3">
                  <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-medium text-muted-foreground">No Requirements</h3>
                    <p className="text-sm text-muted-foreground">Upload a file to start</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Test Case Viewer */}
          <div>
            {currentTestCase ? (
              <TestCaseViewer
                testCase={currentTestCase}
                isVisible={!!currentTestCase}
                onSave={saveTestCase}
              />
            ) : (
              <Card className="p-8 text-center border-dashed border-2">
                <div className="space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-medium text-muted-foreground">No Test Case</h3>
                    <p className="text-sm text-muted-foreground">Generate from requirements</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
