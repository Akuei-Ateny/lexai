
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-24 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="container px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="relative inline-flex items-center gap-x-2 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm text-neutral-600">
                <span className="relative rounded-full bg-neutral-500 p-1">
                  <Shield className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                </span>
                <span>Trusted by 500+ startups</span>
              </div>
              
              <h1 className="font-serif leading-tight">
                <span className="lex-gradient-text">Legal expert</span> for your startup, powered by AI
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground">
                Draft and review legal contracts in minutes, not days. Save thousands in legal fees with our AI-assisted contract platform built for founders.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/review">
                <Button size="lg" className="w-full sm:w-auto">
                  <FileText className="mr-2 h-5 w-5" />
                  Review Contract
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/draft">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Draft New Contract
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              {[
                { count: "90%", label: "Time saved" },
                { count: "$15k+", label: "Average cost saving" },
                { count: "24/7", label: "Always available" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl font-serif font-medium">{stat.count}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative lg:row-span-2">
            <div className="relative overflow-hidden rounded-xl border bg-background p-2 shadow-lg">
              <div className="flex justify-between items-center bg-muted rounded-md p-2 mb-2">
                <div className="flex gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs font-mono text-muted-foreground">Contract Draft</div>
              </div>
              
              <div className="p-4 font-mono text-sm rounded-md bg-accent/50 h-[420px] overflow-hidden">
                <div className="text-muted-foreground mb-4">// Employment Agreement</div>
                <span className="font-medium">THIS EMPLOYMENT AGREEMENT</span> (this <span className="text-blue-600">"Agreement"</span>) is made and entered into as of <span className="text-green-600">[DATE]</span>, by and between <span className="text-green-600">[COMPANY NAME]</span>, a Delaware corporation (the <span className="text-blue-600">"Company"</span>), and <span className="text-green-600">[EMPLOYEE NAME]</span> (the <span className="text-blue-600">"Employee"</span>).
                
                <div className="font-medium mt-4">RECITALS</div>
                
                <div className="mt-2">WHEREAS, the Company desires to employ the Employee on the terms and conditions set forth herein; and</div>
                
                <div className="mt-2">WHEREAS, the Employee desires to be employed by the Company on such terms and conditions.</div>
                
                <div className="font-medium mt-4">AGREEMENT</div>
                
                <div className="mt-2">NOW, THEREFORE, in consideration of the mutual covenants, promises, and obligations set forth herein, the parties agree as follows:</div>
                
                <div className="text-blue-600 mt-4">1. TERM.</div>
                <div className="mt-1 ml-4">The Employee's employment hereunder shall be effective as of <span className="text-green-600">[START DATE]</span> (the <span className="text-blue-600">"Effective Date"</span>) and shall continue until terminated according to the provisions of Section 5.</div>
                
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
