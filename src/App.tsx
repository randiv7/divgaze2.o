import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { CustomCursor } from "@/components/shared/CustomCursor";
import Index from "./pages/Index";
import CreativeLab from "./pages/CreativeLab";
import AISolutions from "./pages/AISolutions";
import WebDev from "./pages/WebDev";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Check if we're on Creative Lab or AI Solutions page
  const isCreativeLabPage = location.pathname === '/creative-lab';
  const isAISolutionsPage = location.pathname === '/ai-solutions';

  useEffect(() => {
    // Skip main loading screen for Creative Lab and AI Solutions pages
    if (isCreativeLabPage || isAISolutionsPage) {
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    // Show loading screen for other pages
    const timer = setTimeout(() => {
      handleLoadingComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [isCreativeLabPage, isAISolutionsPage]);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 300);
  };

  if (isLoading && !isCreativeLabPage && !isAISolutionsPage) {
    return <LoadingScreen onComplete={handleLoadingComplete} duration={2500} />;
  }

  return (
    <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/creative-lab" element={<CreativeLab />} />
        <Route path="/ai-solutions" element={<AISolutions />} />
        <Route path="/web-dev" element={<WebDev />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;