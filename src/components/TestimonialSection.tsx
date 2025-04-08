import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from 'lucide-react';

const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      quote: "LexAI saved us thousands in legal fees and cut our contract drafting time from days to hours. The AI review caught issues our previous lawyer missed.",
      author: "Amanda Sparks",
      title: "Co-Founder, TigerGrub."
    },
    {
      quote: "As a solo founder, I couldn't afford expensive legal help. LexAI gives me peace of mind that my contracts are solid without breaking the bank.",
      author: "Emmett Infante",
      title: "Co-Founder, Dynamic"
    },
    {
      quote: "The questionnaire process is incredibly thorough, and the resulting contracts are well-tailored to our specific needs.",
      author: "Rachel Chen",
      title: "Co-Founder, eir"
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif">Trusted by founders like you</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            See what startup founders are saying about their experience with LexAI.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="bg-muted/50">
              <CardContent className="pt-6 relative">
                <Quote className="absolute top-6 left-6 h-10 w-10 text-muted-foreground/20" />
                <div className="space-y-4 pt-6">
                  <p className="text-lg font-medium relative z-10">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;