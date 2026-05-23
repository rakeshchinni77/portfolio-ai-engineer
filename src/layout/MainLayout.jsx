import Navbar from '@/layout/Navbar';
import Footer from '@/layout/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-[100svh] bg-background text-white selection:bg-primary/30 selection:text-white">
      {/* Global Background Grid & Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.2]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-radial from-primary/10 to-transparent"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-radial from-secondary/10 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-[100svh]">
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
