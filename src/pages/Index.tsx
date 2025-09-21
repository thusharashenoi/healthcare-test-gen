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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  AI-Powered Test Case Generator
                </h1>
                <p className="text-sm text-muted-foreground">Healthcare Software POC</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="hidden md:flex">
                <Brain className="w-3 h-3 mr-1" />
                Healthcare Testing
              </Badge>
              {mode === 'gemini' && (
                <Badge variant="outline" className="text-warning border-warning">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Requires Supabase
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column - Upload & Generation */}
          <div className="space-y-8">
            {/* AI Mode Notice */}
            {mode === 'gemini' && (
              <Alert className="border-warning bg-warning/5">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Live AI Generation requires backend setup.</strong> Connect to Supabase to enable Gemini AI test case generation with API keys and edge functions.
                </AlertDescription>
              </Alert>
            )}

            {/* File Upload */}
            <FileUploader onFileUpload={handleFileUpload} />

            {/* Mode Selection */}
            <ModeSelector mode={mode} onModeChange={setMode} />

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
              <Card className="p-12 text-center border-dashed border-2">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-muted-foreground">
                      No Requirements Uploaded
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload a requirements file to start generating test cases
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Test Case Viewer */}
          <div className="space-y-6">
            {currentTestCase ? (
              <TestCaseViewer
                testCase={currentTestCase}
                isVisible={!!currentTestCase}
                onSave={saveTestCase}
              />
            ) : (
              <Card className="p-12 text-center border-dashed border-2">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-muted-foreground">
                      No Test Case Generated
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Generate a test case from requirements to view it here
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
