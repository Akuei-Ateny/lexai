import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-zinc-900" />
      
      {/* Enhanced gradient orbs */}
      <div 
        className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-zinc-800/20 via-zinc-700/25 to-zinc-900/20 animate-pulse-glow animate-rotate"
        style={{ transformOrigin: 'center center' }}
      />
      
      <div 
        className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-zinc-700/15 via-zinc-600/20 to-zinc-800/15 animate-pulse-glow animate-move-diagonal"
        style={{ animationDelay: '-8s' }}
      />

      {/* Wave effect */}
      <div
        className="absolute -bottom-10 left-0 right-0 h-[200px] opacity-20 animate-wave"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(100,100,100,0.2) 0%, rgba(100,100,100,0) 70%)',
          animationDelay: '-3s',
        }}
      />

      {/* Abstract shapes with enhanced animations */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(12)].map((_, i) => {
          // Calculate different positions, sizes, and animation variants
          const size = Math.random() * 350 + 180;
          const top = `${Math.random() * 100}%`;
          const left = `${Math.random() * 100}%`;
          const animationClass = `animate-float-${(i % 3) + 1}`;
          const delay = `${i * 1.5}s`;
          const opacity = 0.1 + Math.random() * 0.15;
          
          return (
            <div 
              key={i}
              className={`absolute rounded-full blur-xl ${animationClass}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top,
                left,
                background: i % 3 === 0 
                  ? 'radial-gradient(circle, rgba(60,60,60,0.25) 0%, rgba(60,60,60,0) 70%)'
                  : i % 3 === 1
                    ? 'radial-gradient(circle, rgba(80,80,80,0.3) 0%, rgba(80,80,80,0) 70%)'
                    : 'radial-gradient(circle, rgba(100,100,100,0.2) 0%, rgba(100,100,100,0) 70%)',
                animationDelay: delay,
                opacity,
              }}
            />
          );
        })}
      </div>

      {/* Sparkle elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {[...Array(24)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const top = `${Math.random() * 100}%`;
          const left = `${Math.random() * 100}%`;
          const delay = `${Math.random() * 5}s`;
          const duration = `${3 + Math.random() * 4}s`;
          
          return (
            <div
              key={`sparkle-${i}`}
              className="absolute rounded-full bg-white animate-sparkle"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top,
                left,
                opacity: 0.2,
                filter: 'blur(1px)',
                animationDelay: delay,
                animationDuration: duration,
              }}
            />
          );
        })}
      </div>

      {/* Enhanced grid pattern with darker color */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(70,70,70,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(70,70,70,0.05)_1px,transparent_1px)] bg-[size:35px_35px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
};

export default AnimatedBackground;