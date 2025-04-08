
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText, Home, PenTool, Upload } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-serif">
            <span className="font-bold text-xl md:text-2xl">LexAI</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Home
          </Link>
          <Link to="/review" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Review Contract
          </Link>
          <Link to="/draft" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Draft Contract
          </Link>
          <Link to="/templates" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Templates
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/draft">
            <Button variant="default" size="sm" className="hidden md:flex">
              <PenTool className="h-4 w-4 mr-2" /> Create Contract
            </Button>
          </Link>
          
          <div className="md:hidden flex">
            <Button variant="ghost" size="icon" className="rounded-full">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
