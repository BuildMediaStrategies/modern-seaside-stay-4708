
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Apartments from "./pages/Apartments";
import DonatePage from "./pages/DonatePage";
import Wishlist from "./pages/Gallery"; // Renamed Gallery to Wishlist
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Amenities from "./pages/Amenities";
import NotFound from "./pages/NotFound";
import StairwayToHeaven from "./pages/StairwayToHeaven";

// Create a react-query client
const queryClient = new QueryClient();

const AppRoot = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/stairway-to-heaven" element={<StairwayToHeaven />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <LanguageProvider>
    <AppRoot />
  </LanguageProvider>
);

export default App;
