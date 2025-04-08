
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, PenTool } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-10">
          <h2 className="font-serif">Ready to transform your legal workflow?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start drafting and reviewing contracts with confidence today. No credit card required until you're satisfied.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-xl mx-auto">
          <Link to="/review" className="w-full">
            <Button size="lg" variant="outline" className="w-full">
              <FileCheck className="mr-2 h-5 w-5" />
              Review a Contract
            </Button>
          </Link>
          
          <Link to="/draft" className="w-full">
            <Button size="lg" className="w-full">
              <PenTool className="mr-2 h-5 w-5" />
              Draft a Contract
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Need custom solutions for your startup? <a href="#" className="underline font-medium">Contact our team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
