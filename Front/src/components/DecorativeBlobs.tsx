export const DecorativeBlobs = () => {
  return (
    <>
      {/* Top-left yellow blob - diagonal superior esquerda */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] -translate-x-1/3 -translate-y-1/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
      </div>
      
      {/* Bottom-right purple blob - diagonal inferior direita (contraponto) */}
      <div className="fixed bottom-0 right-0 w-[650px] h-[650px] translate-x-1/3 translate-y-1/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/25 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>
      
      {/* Subtle accent blobs for depth */}
      <div className="fixed top-1/3 right-10 w-[300px] h-[300px] pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/12 to-transparent rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '3s' }} />
      </div>
      
      <div className="fixed bottom-1/3 left-10 w-[320px] h-[320px] pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/12 to-transparent rounded-full blur-2xl animate-pulse" 
             style={{ animationDuration: '9s', animationDelay: '2s' }} />
      </div>
      
      {/* Center glow around search area */}
      <div className="fixed top-1/2 left-1/2 w-[800px] h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/8 via-transparent to-primary/8 rounded-full blur-3xl" />
      </div>
    </>
  );
};
