import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Adjust path as needed
import Index from './pages/Index';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import Leaderboard from './pages/Leaderboard';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton
} from '@clerk/clerk-react';

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout> {/* Wrap Routes with Layout */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/take-quiz" element={<TakeQuiz />} />
              <Route path="/take-quiz/:quizId" element={<TakeQuiz />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;