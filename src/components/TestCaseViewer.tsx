import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Database, FileJson, Download, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestCase {
  test_case_id: string;
  req_id: string;
  title: string;
  test_steps: Array<{
    step: number;
    action: string;
    expected: string;
  }>;
  expected_results: string;
  data_profile: {
    fields: Array<{
      name: string;
      type: string;
    }>;
    rows: number;
    note: string;
  };
  status: string;
}

interface TestCaseViewerProps {
  testCase: TestCase | null;
  isVisible: boolean;
  onSave?: () => void;
}

export const TestCaseViewer = ({ testCase, isVisible, onSave }: TestCaseViewerProps) => {
  if (!isVisible || !testCase) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'bg-warning text-warning-foreground';
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <Card className="p-6 bg-gradient-card">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{testCase.test_case_id}</Badge>
              <Badge variant="outline">{testCase.req_id}</Badge>
              <Badge className={getStatusColor(testCase.status)}>
                {testCase.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {testCase.title}
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="default" size="sm" onClick={onSave}>
              <Database className="w-4 h-4 mr-2" />
              Save to DB
            </Button>
          </div>
        </div>
      </Card>

      {/* Test Steps */}
      <Card className="p-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-primary" />
            Test Steps
          </h4>
          
          <div className="space-y-3">
            {testCase.test_steps.map((step) => (
              <div 
                key={step.step}
                className="p-4 bg-muted/50 rounded-lg border border-card-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        Step {step.step}
                      </Badge>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium text-foreground">Action:</span>
                      <span className="ml-2 text-muted-foreground">{step.action}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-foreground">Expected:</span>
                      <span className="ml-2 text-muted-foreground">{step.expected}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Expected Results */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-3">Expected Results</h4>
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-foreground">
            {testCase.expected_results}
          </AlertDescription>
        </Alert>
      </Card>

      {/* Data Profile */}
      <Card className="p-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center">
            <Database className="w-5 h-5 mr-2 text-primary" />
            Data Profile
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium mb-2">Fields</h5>
              <div className="space-y-2">
                {testCase.data_profile.fields.map((field, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted/30 rounded"
                  >
                    <span className="font-medium medical-mono text-sm">
                      {field.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {field.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium">Rows:</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {testCase.data_profile.rows}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium">Note:</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {testCase.data_profile.note}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* JSON View */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold flex items-center">
              <FileJson className="w-5 h-5 mr-2 text-primary" />
              JSON Structure
            </h4>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4 overflow-x-auto">
            <pre className="medical-mono text-xs text-foreground whitespace-pre-wrap">
              {JSON.stringify(testCase, null, 2)}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
};