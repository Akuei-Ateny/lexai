import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Printer, Save, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContractEditorProps {
  contract: {
    title: string;
    content: string;
  };
}

const ContractEditor: React.FC<ContractEditorProps> = ({ contract: initialContract }) => {
  const [contract, setContract] = useState(initialContract);
  const [editableContent, setEditableContent] = useState(initialContract.content);
  const [activeTab, setActiveTab] = useState<string>('preview');
  const { toast } = useToast();

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setEditableContent(newContent);
  };

  const handleSave = () => {
    setContract({
      ...contract,
      content: editableContent,
    });
    toast({
      title: "Changes saved",
      description: "Your contract edits have been saved.",
    });
    setActiveTab('preview');
  };

  const handleDownloadPDF = () => {
    // This is a placeholder - in the final version of the app, we'll use a PDF generation library
    toast({
      title: "Download started",
      description: "Your contract is being downloaded as a PDF.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // This is a placeholder - in the final version of the app, we'll implement sharing functionality
    toast({
      title: "Share link created",
      description: "A secure link to this contract has been copied to your clipboard.",
    });
  };

  return (
    <div className="container max-w-5xl mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif">{contract.title}</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-4">
            <TabsTrigger value="preview" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="edit" className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Edit
            </TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="p-0">
              <TabsContent value="preview" className="mt-0">
                <div className="document-preview animate-fade-in">
                  <h1 className="text-2xl font-bold mb-6 text-center">{contract.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: contract.content }} />
                </div>
              </TabsContent>

              <TabsContent value="edit" className="mt-0">
                <div className="p-4 flex flex-col space-y-4">
                  <div
                    className="lex-editor min-h-[60vh] focus:outline-none focus:ring-2 focus:ring-primary"
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleContentChange}
                    dangerouslySetInnerHTML={{ __html: editableContent }}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default ContractEditor;