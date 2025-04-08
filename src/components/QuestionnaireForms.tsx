import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'select' | 'textarea' | 'multiple';
  options?: string[];
  required?: boolean;
}

const contractTypes = [
  { value: 'nda', label: 'Non-Disclosure Agreement (NDA)' },
  { value: 'employment', label: 'Employment Agreement' },
  { value: 'consulting', label: 'Consulting Agreement' },
  { value: 'services', label: 'Service Agreement' },
  { value: 'partnership', label: 'Partnership Agreement' },
  { value: 'licensing', label: 'Licensing Agreement' },
  { value: 'saas', label: 'SaaS Agreement' },
  { value: 'custom', label: 'Custom Contract' },
];

// Sample questions for different contract types
const questions: Record<string, Question[]> = {
  nda: [
    {
      id: 'company-name',
      title: 'What is your company name?',
      description: 'Please enter the full legal name of your company',
      type: 'text',
      required: true,
    },
    {
      id: 'disclosure-type',
      title: 'What type of NDA do you need?',
      description: 'Select the type of confidentiality agreement',
      type: 'select',
      options: ['One-way (unilateral)', 'Two-way (mutual)'],
      required: true,
    },
    {
      id: 'confidential-info',
      title: 'What type of confidential information will be shared?',
      description: 'Describe the nature of the confidential information',
      type: 'multiple',
      options: ['Business plans', 'Technical data', 'Financial information', 'Product designs', 'Customer lists', 'Other'],
      required: true,
    },
    {
      id: 'duration',
      title: 'How long should the NDA remain in effect?',
      description: 'Select the duration of confidentiality obligations',
      type: 'select',
      options: ['1 year', '2 years', '3 years', '5 years', 'Indefinite'],
      required: true,
    },
    {
      id: 'additional-terms',
      title: 'Are there any additional terms you would like to include?',
      description: 'Add any specific terms or clauses you need',
      type: 'textarea',
      required: false,
    },
  ],
  employment: [
    {
      id: 'company-name',
      title: 'What is your company name?',
      description: 'Please enter the full legal name of your company',
      type: 'text',
      required: true,
    },
    {
      id: 'employee-position',
      title: 'What position are you hiring for?',
      description: 'Enter the job title or position',
      type: 'text',
      required: true,
    },
    {
      id: 'employment-type',
      title: 'What type of employment is this?',
      description: 'Select the employment type',
      type: 'select',
      options: ['Full-time', 'Part-time', 'Contract', 'Temporary'],
      required: true,
    },
    {
      id: 'compensation-details',
      title: 'What are the compensation details?',
      description: 'Describe salary, benefits, equity, etc.',
      type: 'textarea',
      required: true,
    },
    {
      id: 'start-date',
      title: 'When will employment begin?',
      description: 'Specify the starting date or conditions',
      type: 'text',
      required: true,
    },
    {
      id: 'ip-ownership',
      title: 'How should intellectual property be handled?',
      description: 'Specify IP ownership terms',
      type: 'select',
      options: ['Company owns all IP', 'Employee retains certain rights', 'Custom arrangement'],
      required: true,
    },
  ],
  custom: [
    {
      id: 'contract-purpose',
      title: 'What is the purpose of this contract?',
      description: 'Describe what this contract should accomplish',
      type: 'textarea',
      required: true,
    },
    {
      id: 'parties-involved',
      title: 'Who are the parties involved?',
      description: 'List all companies or individuals who will sign this contract',
      type: 'textarea',
      required: true,
    },
    {
      id: 'key-terms',
      title: 'What are the key terms you want to include?',
      description: 'List the most important provisions this contract should contain',
      type: 'textarea',
      required: true,
    },
    {
      id: 'duration',
      title: 'How long should this contract be in effect?',
      description: 'Specify the term or duration',
      type: 'text',
      required: true,
    },
    {
      id: 'governing-law',
      title: 'Which state law should govern this contract?',
      description: 'Specify the governing law jurisdiction',
      type: 'text',
      required: true,
    },
  ],
};

// Default questions for any contract type not specifically defined
const defaultQuestions: Question[] = [
  {
    id: 'company-name',
    title: 'What is your company name?',
    description: 'Please enter the full legal name of your company',
    type: 'text',
    required: true,
  },
  {
    id: 'contract-purpose',
    title: 'What is the purpose of this contract?',
    description: 'Describe what this contract should accomplish',
    type: 'textarea',
    required: true,
  },
  {
    id: 'parties-involved',
    title: 'Who are the parties involved?',
    description: 'List all companies or individuals who will sign this contract',
    type: 'textarea',
    required: true,
  },
  {
    id: 'key-terms',
    title: 'What are the key terms you want to include?',
    description: 'List the most important provisions this contract should contain',
    type: 'textarea',
    required: true,
  },
];

interface QuestionnaireFormsProps {
  onComplete: (answers: Record<string, any>) => void;
}

const QuestionnaireForms: React.FC<QuestionnaireFormsProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [contractType, setContractType] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const { toast } = useToast();

  // Get relevant questions based on contract type
  const currentQuestions = contractType ? 
    (questions[contractType] || defaultQuestions) : [];
  
  // Determine if current step is contract type selection
  const isTypeSelection = step === 0;
  
  // Current question or null if on contract type selection
  const currentQuestion = !isTypeSelection && step <= currentQuestions.length ? 
    currentQuestions[step - 1] : null;

  // Handle contract type selection
  const handleSelectType = (type: string) => {
    setContractType(type);
    setAnswers(prev => ({ ...prev, contractType: type }));
    setStep(1);
  };

  // Handle next question
  const handleNext = () => {
    // If current question is required and not answered, show toast error
    if (currentQuestion?.required && !answers[currentQuestion.id]) {
      toast({
        title: "Required field",
        description: "Please answer this question before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (step < currentQuestions.length + 1) {
      setStep(step + 1);
    } else {
      // All questions answered, complete questionnaire
      onComplete(answers);
    }
  };

  // Handle previous question or back to contract type selection
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Update answers when question is answered
  const handleAnswer = (id: string, value: any) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  // Progress percentage
  const progress = isTypeSelection ? 
    0 : ((step) / (currentQuestions.length + 1)) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      {/* Progress bar */}
      <div className="w-full bg-muted h-2 rounded-full mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Contract type selection */}
      {isTypeSelection ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>What type of contract do you need?</CardTitle>
            <CardDescription>Select the type of contract you want to create</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {contractTypes.map((type) => (
                <Button
                  key={type.value}
                  variant="outline"
                  className={`h-auto py-4 px-6 flex flex-col items-start text-left hover:bg-accent/50 transition-all ${
                    contractType === type.value ? 'border-primary ring-1 ring-primary' : ''
                  }`}
                  onClick={() => handleSelectType(type.value)}
                >
                  <span className="font-medium text-base">{type.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : step <= currentQuestions.length ? (
        // Question cards
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{currentQuestion?.title}</CardTitle>
            <CardDescription>{currentQuestion?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentQuestion?.type === 'text' && (
              <div className="space-y-2">
                <Label htmlFor={currentQuestion.id}>{currentQuestion.title}</Label>
                <Input 
                  id={currentQuestion.id} 
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  placeholder="Enter your answer"
                />
              </div>
            )}
            {currentQuestion?.type === 'textarea' && (
              <div className="space-y-2">
                <Label htmlFor={currentQuestion.id}>{currentQuestion.title}</Label>
                <Textarea 
                  id={currentQuestion.id} 
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  placeholder="Enter your answer"
                  rows={5}
                />
              </div>
            )}
            {currentQuestion?.type === 'select' && currentQuestion.options && (
              <div className="space-y-2">
                <Label htmlFor={currentQuestion.id}>{currentQuestion.title}</Label>
                <Select 
                  value={answers[currentQuestion.id] || ''} 
                  onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                >
                  <SelectTrigger id={currentQuestion.id}>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentQuestion.options.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {currentQuestion?.type === 'multiple' && currentQuestion.options && (
              <div className="space-y-4">
                <Label>{currentQuestion.title}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentQuestion.options.map((option) => {
                    const isSelected = Array.isArray(answers[currentQuestion.id]) && 
                      answers[currentQuestion.id].includes(option);
                    
                    return (
                      <Button
                        key={option}
                        type="button"
                        variant="outline"
                        className={`justify-start h-auto py-3 ${isSelected ? 'border-primary bg-primary/5' : ''}`}
                        onClick={() => {
                          const currentSelections = Array.isArray(answers[currentQuestion.id]) ? 
                            [...answers[currentQuestion.id]] : [];
                          
                          const newSelections = isSelected
                            ? currentSelections.filter(item => item !== option)
                            : [...currentSelections, option];
                            
                          handleAnswer(currentQuestion.id, newSelections);
                        }}
                      >
                        <div className="mr-2">
                          {isSelected ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                          )}
                        </div>
                        {option}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext}>
              {step < currentQuestions.length ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Generate Contract'
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        // Final summary before generating
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Review your answers</CardTitle>
            <CardDescription>Make sure everything looks correct before we generate your contract</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md space-y-3">
              {Object.entries(answers).map(([key, value]) => {
                // Skip contract type as it's shown in the title
                if (key === 'contractType') return null;
                
                // Find the question to display the title
                const question = currentQuestions.find(q => q.id === key);
                
                return (
                  <div key={key} className="grid grid-cols-3 gap-4 border-b border-muted-foreground/20 pb-2 last:border-0 last:pb-0">
                    <div className="font-medium">{question?.title || key}</div>
                    <div className="col-span-2">
                      {Array.isArray(value) 
                        ? value.join(', ')
                        : String(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={() => onComplete(answers)}>
              Generate Contract
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default QuestionnaireForms;