import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, FileQuestion, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { analyzeContract } from '../services/openAiService';

const ContractReview: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reviewResult, setReviewResult] = useState<string | null>(null);
  const [contractText, setContractText] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        toast({
          title: "File selected",
          description: `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file format",
          description: "Please upload a PDF document.",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      // For demo purposes, we'll simulate reading the PDF content
      // In a real application, we'd use a PDF parsing library
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // Simulated contract text (in a real app, we'd extract this from the PDF)
      const extractedText = `This is a ${file.name} contract between ACME Corp and XYZ Inc., 
      dated ${new Date().toLocaleDateString()}. 
      
      The parties agree to the following terms:
      1. Term: 12 months
      2. Payment: $5,000 per month
      3. Termination: 30 days notice
      4. Governing Law: California
      
      This contract includes a non-compete clause lasting 3 years and covering all of North America.
      Intellectual property created during the term will be owned exclusively by ACME Corp.
      Liability is limited to $10,000.`;
      
      setContractText(extractedText);
      
      // Use OpenAI to analyze the contract
      const analysis = await analyzeContract(extractedText);
      setReviewResult(analysis);
      
      toast({
        title: "Contract reviewed",
        description: "Your contract has been analyzed successfully with AI.",
      });
    } catch (error) {
      console.error("Contract analysis error:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze contract. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-10 text-center space-y-4">
          <h2 className="font-serif">Contract Review</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Upload your contract to get an instant AI-powered legal review highlighting risks and suggested improvements.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!reviewResult ? (
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center space-y-6 py-12">
                  <div className="rounded-full bg-muted p-6">
                    <FileQuestion className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-medium">Upload your contract</h3>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your PDF contract or click to browse
                    </p>
                  </div>
                  
                  <div className="grid w-full gap-6">
                    <label htmlFor="contract-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:bg-accent transition-colors">
                        <Upload className="h-6 w-6 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">PDF files only, max 10MB</p>
                        <p className="text-xs text-muted-foreground/70">Your documents are processed securely and confidentially</p>
                        <input
                          id="contract-upload"
                          type="file"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </label>
                    
                    {file && (
                      <div className="flex items-center justify-between bg-accent p-4 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-background rounded p-1.5 mr-3">
                            <FileQuestion className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button onClick={() => setFile(null)} variant="ghost" size="sm">Remove</Button>
                      </div>
                    )}
                    
                    <Button onClick={handleUpload} disabled={!file || isUploading || isAnalyzing} className="w-full">
                      {isUploading ? "Uploading..." : isAnalyzing ? "Analyzing..." : "Review Contract"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="review">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="review">Review</TabsTrigger>
                  <TabsTrigger value="document">Document</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button onClick={() => setReviewResult(null)} variant="outline" size="sm">New Review</Button>
                  <Button size="sm">Download Report</Button>
                </div>
              </div>
              
              <TabsContent value="review" className="mt-0">
                <Card className="border-0">
                  <CardContent className="p-6">
                    <div className="prose prose-neutral max-w-none">
                      <div className="markdown-content">
                        {reviewResult.split('\n').map((line, i) => {
                          if (line.startsWith('## ')) {
                            return <h2 key={i} className="text-2xl font-serif mt-6 mb-4">{line.replace('## ', '')}</h2>;
                          } else if (line.startsWith('### ')) {
                            return <h3 key={i} className="text-xl font-serif mt-5 mb-3">{line.replace('### ', '')}</h3>;
                          } else if (line.includes('**Recommendation**:')) {
                            return (
                              <div key={i} className="bg-accent/50 p-3 rounded-md my-2">
                                <p className="text-sm">
                                  <span className="font-medium">Recommendation:</span> 
                                  {line.split('**Recommendation**:')[1]}
                                </p>
                              </div>
                            );
                          } else if (line.includes('⚠️')) {
                            return (
                              <div key={i} className="flex items-start gap-2 my-3">
                                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                <p className="font-medium">{line}</p>
                              </div>
                            );
                          } else if (line.startsWith('- ')) {
                            return <li key={i} className="my-1">{line.replace('- ', '')}</li>;
                          } else if (line.trim() === '') {
                            return <div key={i} className="h-4"></div>;
                          } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                            return (
                              <div key={i} className="flex items-start gap-3 my-3 bg-background p-3 rounded-md border">
                                <span className="font-medium w-6 text-center">{line.split('.')[0]}.</span>
                                <div>{line.split('. ')[1]}</div>
                              </div>
                            );
                          } else {
                            return <p key={i} className="my-2">{line}</p>;
                          }
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="document" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="border rounded p-4 text-center text-muted-foreground">
                      <p>Document preview would appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContractReview;