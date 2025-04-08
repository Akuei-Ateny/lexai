import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, AlertTriangle, Download, FileText, PenLine } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { generateContract } from '../services/openAiService';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
  required: boolean;
  value: string;
}

const ContractDraft: React.FC = () => {
  const isMobile = useIsMobile();
  const [contractType, setContractType] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);
  const { toast } = useToast();

  const contractTypes = [
    { value: 'nda', label: 'Non-Disclosure Agreement (NDA)' },
    { value: 'employment', label: 'Employment Agreement' },
    { value: 'consulting', label: 'Consulting Agreement' },
    { value: 'saas', label: 'SaaS Agreement' },
    { value: 'service', label: 'Service Agreement' },
    { value: 'partnership', label: 'Partnership Agreement' }
  ];

  const questionnaires: Record<string, Question[]> = {
    'nda': [
      { id: 'company-name', text: 'What is your company name?', type: 'text', required: true, value: '' },
      { id: 'counterparty', text: 'Who is the other party to this NDA?', type: 'text', required: true, value: '' },
      { id: 'state', text: 'Which state\'s law will govern this agreement?', type: 'select', options: ['California', 'New York', 'Delaware', 'Texas', 'Florida'], required: true, value: '' },
      { id: 'term', text: 'How long should the confidentiality obligations last?', type: 'select', options: ['1 year', '2 years', '3 years', '5 years', 'Perpetual'], required: true, value: '' },
      { id: 'mutual', text: 'Is this a mutual (both parties share confidential information) or one-way NDA?', type: 'select', options: ['Mutual', 'One-way (we disclose)', 'One-way (they disclose)'], required: true, value: '' },
      { id: 'purpose', text: 'What is the purpose of sharing confidential information?', type: 'textarea', required: true, value: '' }
    ],
    'employment': [
      { id: 'company-name', text: 'What is your company name?', type: 'text', required: true, value: '' },
      { id: 'employee-name', text: 'What is the employee\'s name?', type: 'text', required: true, value: '' },
      { id: 'position', text: 'What position will the employee hold?', type: 'text', required: true, value: '' },
      { id: 'start-date', text: 'What is the start date of employment?', type: 'text', required: true, value: '' },
      { id: 'compensation', text: 'What is the compensation structure? (e.g., $X per year, equity details)', type: 'textarea', required: true, value: '' },
      { id: 'state', text: 'Which state will the employee be based in?', type: 'select', options: ['California', 'New York', 'Delaware', 'Texas', 'Florida'], required: true, value: '' },
      { id: 'at-will', text: 'Should this be an "at-will" employment relationship?', type: 'select', options: ['Yes', 'No'], required: true, value: 'Yes' },
      { id: 'ip-assignment', text: 'Do you want to include intellectual property assignment provisions?', type: 'select', options: ['Yes', 'No'], required: true, value: 'Yes' }
    ],
    'consulting': [
      { id: 'company-name', text: 'What is your company name?', type: 'text', required: true, value: '' },
      { id: 'consultant-name', text: 'What is the consultant\'s name or company?', type: 'text', required: true, value: '' },
      { id: 'services', text: 'Describe the consulting services to be provided:', type: 'textarea', required: true, value: '' },
      { id: 'term', text: 'What is the duration of the consulting agreement?', type: 'select', options: ['Month-to-month', '3 months', '6 months', '1 year', 'Project-based'], required: true, value: '' },
      { id: 'payment', text: 'What are the payment terms? (e.g., hourly rate, fixed fee, milestones)', type: 'textarea', required: true, value: '' },
      { id: 'ip-ownership', text: 'Who will own intellectual property created during the engagement?', type: 'select', options: ['Company owns all IP', 'Consultant owns all IP', 'Company licenses IP'], required: true, value: '' }
    ],
    'saas': [
      { id: 'company-name', text: 'What is your company name?', type: 'text', required: true, value: '' },
      { id: 'customer-name', text: 'What is the customer\'s name?', type: 'text', required: true, value: '' },
      { id: 'service-description', text: 'Describe your SaaS service:', type: 'textarea', required: true, value: '' },
      { id: 'subscription-model', text: 'What is your subscription model?', type: 'select', options: ['Monthly', 'Annual', 'Pay-as-you-go', 'Custom'], required: true, value: '' },
      { id: 'term', text: 'What is the initial term of the agreement?', type: 'select', options: ['Month-to-month', '1 year', '2 years', '3 years', 'Custom'], required: true, value: '' },
      { id: 'sla', text: 'Do you want to include a Service Level Agreement (SLA)?', type: 'select', options: ['Yes', 'No'], required: true, value: '' },
      { id: 'data-processing', text: 'Will you be processing personal data under this agreement?', type: 'select', options: ['Yes', 'No'], required: true, value: '' }
    ],
    'service': [
      { id: 'company-name', text: 'What is your company name?', type: 'text', required: true, value: '' },
      { id: 'client-name', text: 'What is the client\'s name?', type: 'text', required: true, value: '' },
      { id: 'service-description', text: 'Describe the services to be provided:', type: 'textarea', required: true, value: '' },
      { id: 'service-duration', text: 'What is the duration of the service agreement?', type: 'select', options: ['One-time project', '3 months', '6 months', '1 year', 'Ongoing'], required: true, value: '' },
      { id: 'payment-terms', text: 'What are the payment terms?', type: 'textarea', required: true, value: '' },
      { id: 'termination', text: 'How can the agreement be terminated?', type: 'select', options: ['With 30 days notice', 'With 60 days notice', 'Upon project completion', 'Custom'], required: true, value: '' },
      { id: 'state', text: 'Which state\'s law will govern this agreement?', type: 'select', options: ['California', 'New York', 'Delaware', 'Texas', 'Florida'], required: true, value: '' }
    ],
    'partnership': [
      { id: 'partnership-name', text: 'What is the name of the partnership?', type: 'text', required: true, value: '' },
      { id: 'partners', text: 'List all partners (individuals or entities):', type: 'textarea', required: true, value: '' },
      { id: 'purpose', text: 'What is the purpose of the partnership?', type: 'textarea', required: true, value: '' },
      { id: 'contributions', text: 'Describe the capital/resource contributions of each partner:', type: 'textarea', required: true, value: '' },
      { id: 'profit-sharing', text: 'How will profits and losses be divided?', type: 'textarea', required: true, value: '' },
      { id: 'state', text: 'Which state\'s law will govern this agreement?', type: 'select', options: ['California', 'New York', 'Delaware', 'Texas', 'Florida'], required: true, value: '' },
      { id: 'duration', text: 'What is the expected duration of the partnership?', type: 'select', options: ['Indefinite', '1 year', '2 years', '5 years', 'Upon completion of a project'], required: true, value: '' }
    ]
  };

  const handleContractTypeChange = (value: string) => {
    setContractType(value);
    setQuestions(questionnaires[value]);
    setCurrentStep(1);
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, value } : q
    ));
  };

  const validateCurrentStep = () => {
    const currentQuestions = questions.slice(currentStep - 1, currentStep + 2);
    return currentQuestions.every(q => !q.required || q.value.trim() !== '');
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      toast({
        variant: "destructive",
        title: "Please answer all required questions",
        description: "Some required fields are missing answers.",
      });
      return;
    }
    
    if (currentStep + 3 >= questions.length) {
      handleGenerate();
    } else {
      setCurrentStep(currentStep + 3);
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(0, currentStep - 3));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    const unanswered = questions.filter(q => q.required && q.value.trim() === '');
    if (unanswered.length > 0) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: `Please answer all ${unanswered.length} required questions.`,
      });
      setIsGenerating(false);
      return;
    }
    
    try {
      const answers: Record<string, string> = {};
      questions.forEach(q => {
        answers[q.id] = q.value;
      });
      
      answers.contractType = contractTypes.find(c => c.value === contractType)?.label || contractType;
      
      const generatedText = await generateContract(contractType, answers);
      setGeneratedContract(generatedText);
      
      toast({
        title: "Contract generated",
        description: "Your contract has been created successfully with AI.",
      });
    } catch (error) {
      console.error("Contract generation error:", error);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate contract. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-10 text-center space-y-4">
          <h2 className="font-serif">Draft a Contract</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Answer a few questions and our AI will draft a customized contract for your specific needs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!contractType ? (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="text-xl font-medium">Select a contract type</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll customize the questions based on your selection
                    </p>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {contractTypes.map((type) => (
                      <Card 
                        key={type.value} 
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => handleContractTypeChange(type.value)}
                      >
                        <CardContent className="p-6 text-center">
                          <FileText className="h-8 w-8 mx-auto mb-3" />
                          <h4 className="font-medium">{type.label}</h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : !generatedContract ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => currentStep === 0 ? setContractType('') : handleBack()}
                    >
                      Back
                    </Button>
                    <h3 className="font-medium">
                      {contractTypes.find(c => c.value === contractType)?.label}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Step {currentStep === 0 ? 1 : Math.min(Math.ceil((currentStep + 3) / 3), Math.ceil(questions.length / 3))} of {Math.ceil(questions.length / 3)}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {questions.slice(currentStep, currentStep + 3).map((question) => (
                    <div key={question.id} className="space-y-2">
                      <Label htmlFor={question.id} className="flex items-center">
                        {question.text}
                        {question.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      
                      {question.type === 'text' && (
                        <Input
                          id={question.id}
                          value={question.value}
                          onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                        />
                      )}
                      
                      {question.type === 'textarea' && (
                        <Textarea
                          id={question.id}
                          value={question.value}
                          onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                          rows={4}
                        />
                      )}
                      
                      {question.type === 'select' && question.options && (
                        <Select 
                          value={question.value} 
                          onValueChange={(value) => handleQuestionChange(question.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {question.options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end gap-4 mt-8">
                  <Button 
                    onClick={handleNext} 
                    disabled={isGenerating}
                  >
                    {currentStep + 3 >= questions.length ? (isGenerating ? "Generating..." : "Generate Contract") : "Continue"}
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Preview All Questions</Button>
                    </DialogTrigger>
                    <DialogContent className={isMobile ? "max-w-full" : "max-w-2xl"}>
                      <DialogHeader>
                        <DialogTitle>All Questions</DialogTitle>
                        <DialogDescription>
                          Review all questions before generating your contract
                        </DialogDescription>
                      </DialogHeader>
                      <div className="max-h-[60vh] overflow-y-auto mt-4 space-y-6">
                        {questions.map((q) => (
                          <div key={q.id} className="space-y-1">
                            <Label className="flex items-start">
                              {q.text}
                              {q.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            <p className={`text-sm rounded-md p-2 ${q.value ? "bg-accent" : "bg-destructive/10"}`}>
                              {q.value || "Not answered yet"}
                            </p>
                          </div>
                        ))}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={handleGenerate} disabled={isGenerating}>
                          {isGenerating ? "Generating..." : "Generate Contract"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="document">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="document">Document</TabsTrigger>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button onClick={() => setGeneratedContract(null)} variant="outline" size="sm">
                    Start Over
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" /> Download PDF
                  </Button>
                </div>
              </div>
              
              <TabsContent value="document" className="mt-0">
                <Card className="border-0">
                  <CardContent className="p-0">
                    <div className="document-preview">
                      <div className="document-content">
                        {generatedContract && generatedContract.split('\n').map((line, i) => {
                          if (line.startsWith('# ')) {
                            return <h1 key={i} className="text-center text-2xl font-bold mb-8">{line.replace('# ', '')}</h1>;
                          } else if (line.startsWith('## ')) {
                            return <h2 key={i} className="text-xl font-bold mt-6 mb-4">{line.replace('## ', '')}</h2>;
                          } else if (line.trim() === '') {
                            return <div key={i} className="h-4"></div>;
                          } else {
                            return <p key={i} className="my-2 text-sm">{line}</p>;
                          }
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="edit" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4 text-sm bg-muted p-3 rounded-md">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span>You can edit the contract text directly. Changes will be saved automatically.</span>
                    </div>
                    
                    <Textarea 
                      className="lex-editor font-mono" 
                      value={generatedContract || ''} 
                      onChange={(e) => setGeneratedContract(e.target.value)}
                      rows={20} 
                    />
                    
                    <div className="mt-4 text-right">
                      <Button>
                        <PenLine className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
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

export default ContractDraft;