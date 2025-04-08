
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileCheck, FileText, PenTool, Download, Lock, Edit } from "lucide-react";

const FeatureSection: React.FC = () => {
  const features = [
    {
      title: "Contract Review",
      icon: <FileCheck className="h-6 w-6 text-neutral-700" />,
      description: "Upload your contracts and get AI-powered review and analysis in minutes, not days."
    },
    {
      title: "Smart Drafting",
      icon: <PenTool className="h-6 w-6 text-neutral-700" />,
      description: "Answer a few questions and LexAI will draft custom contracts tailored to your startup's needs."
    },
    {
      title: "Template Library",
      icon: <FileText className="h-6 w-6 text-neutral-700" />,
      description: "Access a library of legally-sound templates for NDAs, employment agreements, and more."
    },
    {
      title: "Live Editing",
      icon: <Edit className="h-6 w-6 text-neutral-700" />,
      description: "Make changes directly in the editor with real-time formatting and clause suggestions."
    },
    {
      title: "Export to PDF",
      icon: <Download className="h-6 w-6 text-neutral-700" />,
      description: "Download your contracts as professional PDF documents ready for signature."
    },
    {
      title: "Secure & Private",
      icon: <Lock className="h-6 w-6 text-neutral-700" />,
      description: "Your contracts and data are encrypted and never shared with third parties."
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-medium border-neutral-300 bg-white shadow-sm">
            <Sparkles className="mr-1 h-3.5 w-3.5 text-neutral-600" />
            <span>Features</span>
          </div>
          <h2 className="font-serif">Everything you need to streamline legal work</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our AI-powered platform helps you create, review, and manage legal documents with confidence and ease.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Card key={i} className="lex-card-hover">
              <CardHeader className="pb-2">
                <div className="mb-3">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
