import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TemplatesPage: React.FC = () => {
  const templateCategories = [
    { id: 'popular', name: 'Popular' },
    { id: 'startup', name: 'Startup' },
    { id: 'employment', name: 'Employment' },
    { id: 'ip', name: 'Intellectual Property' },
    { id: 'commercial', name: 'Commercial' },
  ];
  
  const templates = [
    {
      id: 1,
      title: 'Mutual Non-Disclosure Agreement',
      description: 'Standard two-way confidentiality agreement for business discussions.',
      category: 'popular',
      downloadCount: 2543,
      lastUpdated: '2025-02-15',
    },
    {
      id: 2,
      title: 'Independent Contractor Agreement',
      description: 'Agreement for hiring freelancers and consultants.',
      category: 'popular',
      downloadCount: 1982,
      lastUpdated: '2025-01-30',
    },
    {
      id: 3,
      title: 'Employment Agreement',
      description: 'Standard employment contract for hiring new employees.',
      category: 'employment',
      downloadCount: 1756,
      lastUpdated: '2025-03-02',
    },
    {
      id: 4,
      title: 'SAFE Agreement (Simple Agreement for Future Equity)',
      description: 'Y Combinator\'s simple investment instrument for early-stage funding.',
      category: 'startup',
      downloadCount: 1432,
      lastUpdated: '2025-02-28',
    },
    {
      id: 5,
      title: 'Website Terms of Service',
      description: 'Terms governing the use of your website or application.',
      category: 'popular',
      downloadCount: 1324,
      lastUpdated: '2025-03-10',
    },
    {
      id: 6,
      title: 'Privacy Policy',
      description: 'GDPR and CCPA compliant privacy policy for websites and apps.',
      category: 'popular',
      downloadCount: 1289,
      lastUpdated: '2025-03-12',
    },
    {
      id: 7,
      title: 'Intellectual Property Assignment',
      description: 'Transfer ownership of IP rights from one party to another.',
      category: 'ip',
      downloadCount: 943,
      lastUpdated: '2025-02-10',
    },
    {
      id: 8,
      title: 'Software License Agreement',
      description: 'Terms for licensing proprietary software to customers.',
      category: 'commercial',
      downloadCount: 876,
      lastUpdated: '2025-01-25',
    },
    {
      id: 9,
      title: 'Founders\' Agreement',
      description: 'Agreement between co-founders establishing roles and equity.',
      category: 'startup',
      downloadCount: 823,
      lastUpdated: '2025-02-05',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-10 space-y-4">
            <h1 className="font-serif text-3xl md:text-4xl">Template Library</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Browse our collection of legally-vetted templates. Customize them to fit your specific needs.
            </p>
          </div>
          
          <Tabs defaultValue="popular" className="space-y-8">
            <TabsList className="w-full flex overflow-x-auto justify-start sm:justify-center p-0 h-auto space-x-2">
              {templateCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {templateCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {templates
                    .filter(template => template.category === category.id)
                    .map((template) => (
                      <Card key={template.id} className="lex-card-hover">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle>{template.title}</CardTitle>
                              <CardDescription>{template.description}</CardDescription>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                              <FileText className="h-5 w-5 text-foreground/70" />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>Downloaded {template.downloadCount} times</span>
                            <span className="mx-2">•</span>
                            <span>Updated {template.lastUpdated}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-1" /> Preview
                          </Button>
                          <Button size="sm" className="w-full">
                            <Download className="h-4 w-4 mr-1" /> Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                
                {templates.filter(template => template.category === category.id).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No templates found in this category.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TemplatesPage;