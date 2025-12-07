import { useNavigate } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background dark:from-background dark:via-card dark:to-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number with Glow Effect */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-muted-foreground to-primary leading-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30">
            <h1 className="text-[12rem] md:text-[16rem] font-bold text-primary leading-none">
              404
            </h1>
          </div>
        </div>

        {/* Search Icon with Animation */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Search className="w-16 h-16 text-muted-foreground animate-bounce" />
            <div className="absolute inset-0 blur-xl bg-primary opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="group relative px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:bg-secondary/80 hover:scale-105 border border-border w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Go Back
            </span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </span>
            <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
