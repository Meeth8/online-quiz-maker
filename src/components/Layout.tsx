import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Home, 
  PlusSquare, 
  BookOpen, 
  Award, 
  BarChart3 
} from 'lucide-react';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
  UserButton
} from '@clerk/clerk-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Create Quiz', href: '/create-quiz', icon: PlusSquare },
    { name: 'Take Quiz', href: '/take-quiz', icon: BookOpen },
    { name: 'Leaderboard', href: '/leaderboard', icon: Award },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 overflow-hidden">
              <div className="absolute inset-0 hero-gradient rounded-md animate-pulse-slow"></div>
              <div className="absolute inset-[2px] bg-white rounded-[4px] flex items-center justify-center">
                <span className="text-primary font-bold text-lg">T</span>
              </div>
            </div>
            <span className="font-bold text-xl text-foreground">Trivion</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive(item.href) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Authentication */}
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton>
                <Button size="sm">Login</Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm" variant="outline" className="ml-2">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 pt-16 md:hidden animate-appear">
          <nav className="container flex flex-col p-4 space-y-2">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <item.icon size={18} className="mr-2" />
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col pt-4 space-y-2 border-t border-border">
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" size="lg" className="justify-start">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size="lg" className="justify-start">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto pt-20 px-4 pb-12 min-h-screen">
        <div className="page-transition">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="relative w-6 h-6 overflow-hidden">
                <div className="absolute inset-0 hero-gradient rounded-md"></div>
                <div className="absolute inset-[2px] bg-white rounded-[3px] flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">T</span>
                </div>
              </div>
              <span className="font-semibold text-foreground">Trivion</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Trivion. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;