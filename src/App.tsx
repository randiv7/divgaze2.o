import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { CustomCursor } from "@/components/shared/CustomCursor";
import Index from "./pages/Index";
import CreativeLab from "./pages/CreativeLab";
import AISolutions from "./pages/AISolutions";
import WebDev from "./pages/WebDev";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    // Fade out loader, then show content
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 300);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} duration={2500} />;
  }

  return (
    <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* CustomCursor moved inside BrowserRouter so it can access useLocation */}
            <CustomCursor />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/creative-lab" element={<CreativeLab />} />
              <Route path="/ai-solutions" element={<AISolutions />} />
              <Route path="/web-dev" element={<WebDev />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;