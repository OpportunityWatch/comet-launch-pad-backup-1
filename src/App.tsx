
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useMemo } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Configure the query client with optimized settings
const App = () => {
  // Create the query client with memoization to prevent recreation on re-renders
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes (replaces cacheTime)
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }), []);

  useEffect(() => {
    // Set default metadata
    document.title = "CometCopters - LED Slingshot Helicopters | Up to 150+ Feet High";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 
        "CometCopters are LED Slingshot Helicopters that soar 150+ feet into the air. Perfect for outdoor events and spectacular at night. San Diego's original premium quality LED flyers."
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
