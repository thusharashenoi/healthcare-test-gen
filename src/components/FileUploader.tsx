import { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileUpload: (requirements: any[]) => void;
}

export const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.txt')) {
      setError('Please upload a .txt file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const requirements = text.split('\n')
        .map((line, index) => line.trim())
        .filter(line => line.length > 0)
        .map((line, index) => ({
          req_id: `REQ-${index + 1}`,
          title: line.length > 50 ? line.substring(0, 50) + '...' : line,
          text: line
        }));

      onFileUpload(requirements);
    } catch (err) {
      setError('Failed to process file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [onFileUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  return (
    <Card className="p-8 border-dashed border-2 transition-all duration-300 hover:shadow-card">
      <div
        className={cn(
          "text-center space-y-4 transition-all duration-300",
          isDragOver && "scale-105"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className={cn(
          "mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300",
          isDragOver && "bg-primary/20",
          isLoading && "animate-pulse-subtle"
        )}>
          {isLoading ? (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className={cn(
              "w-8 h-8 text-primary transition-transform duration-300",
              isDragOver && "scale-110"
            )} />
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Upload Requirements Document
          </h3>
          <p className="text-muted-foreground">
            Drag and drop your .txt file here, or click to browse
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>Supports .txt files only</span>
        </div>

        <input
          type="file"
          accept=".txt"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          disabled={isLoading}
        />
        
        <Button 
          variant="outline" 
          className="mt-4" 
          asChild
          disabled={isLoading}
        >
          <label htmlFor="file-upload" className="cursor-pointer">
            {isLoading ? 'Processing...' : 'Choose File'}
          </label>
        </Button>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
};