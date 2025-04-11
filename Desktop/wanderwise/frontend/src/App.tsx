import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";  // ❌ BrowserRouter hata diya!

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Expenses from "./pages/Expenses";
import SafePlaces from "./pages/SafePlaces";
import SocialConnect from "./pages/SocialConnect";
import Accessibility from "./pages/Accessibility";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import DarkModeWrapper from "./DarkModeWrapper";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const App = () => (
  <DarkModeWrapper>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/*  BrowserRouter yaha se hata diya! */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/safe-places" element={<SafePlaces />} />
          <Route path="/social-connect" element={<SocialConnect />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </DarkModeWrapper>
);

export default App;
