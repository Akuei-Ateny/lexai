import React from 'react';
import Navbar from '@/components/Navbar';
import ContractReview from '@/components/ContractReview';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const ReviewPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1">
        <ContractReview />
      </main>
      <Footer />
    </div>
  );
};

export default ReviewPage;