import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Header component with logo and navigation
 * Clean, minimal nav that doesn't distract from the main CTA
 */
export const Header = () => {
  return (
    <header className="flex justify-between items-center py-2.5 gap-3">
      {/* Logo */}
      <Link 
        to="/" 
        className="flex items-center gap-2.5 text-foreground font-black text-lg tracking-tight no-underline"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-primary to-primary-dark flex items-center justify-center shadow-primary">
          <span className="text-primary-foreground font-black text-sm">R</span>
        </div>
        Recourse
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        <a 
          href="#cases" 
          className="px-2.5 py-2 text-sm font-black text-muted-foreground hover:text-foreground hover:bg-foreground/4 rounded-xl transition-colors"
        >
          Case types
        </a>
        <a 
          href="#how" 
          className="px-2.5 py-2 text-sm font-black text-muted-foreground hover:text-foreground hover:bg-foreground/4 rounded-xl transition-colors"
        >
          How it works
        </a>
        <a 
          href="#pricing" 
          className="px-2.5 py-2 text-sm font-black text-muted-foreground hover:text-foreground hover:bg-foreground/4 rounded-xl transition-colors"
        >
          Pricing
        </a>
        <a 
          href="#faq" 
          className="px-2.5 py-2 text-sm font-black text-muted-foreground hover:text-foreground hover:bg-foreground/4 rounded-xl transition-colors"
        >
          FAQ
        </a>
        <Button variant="navCta" size="sm" asChild>
          <Link to="/start">Start</Link>
        </Button>
      </nav>
    </header>
  );
};
