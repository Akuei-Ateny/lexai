import React from 'react';
import Navbar from '@/components/Navbar';
import ContractDraft from '@/components/ContractDraft';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const DraftPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1">
        <ContractDraft />
      </main>
      <Footer />
    </div>
  );
};

export default DraftPage;
