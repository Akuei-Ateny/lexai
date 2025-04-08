
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-10 bg-background">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <h4 className="font-serif text-lg font-medium">LexAI</h4>
          <p className="text-sm text-muted-foreground">
            AI-powered legal assistant for startups. Draft and review contracts with confidence.
          </p>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-medium">Features</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/review" className="text-muted-foreground hover:text-foreground transition-colors">
                Contract Review
              </Link>
            </li>
            <li>
              <Link to="/draft" className="text-muted-foreground hover:text-foreground transition-colors">
                Contract Drafting
              </Link>
            </li>
            <li>
              <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
                Template Library
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-medium">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-medium">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-6 md:mt-8 pt-6 border-t">
        <p className="text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} LexAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
