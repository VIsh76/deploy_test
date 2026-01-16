import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Mobile Sticky CTA
 * 
 * Fixed bottom bar on mobile for easy access to primary action.
 * Only visible on small screens.
 */
export const MobileCTA = () => {
  return (
    <div className="md:hidden fixed left-0 right-0 bottom-0 p-3 bg-background/92 backdrop-blur-sm border-t border-border z-50">
      <div className="flex gap-2.5 max-w-xl mx-auto">
        <Button variant="cta" size="lg" className="flex-1" asChild>
          <Link to="/start">
            Start
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button variant="ctaSecondary" size="lg" asChild>
          <a href="#cases">Case types</a>
        </Button>
      </div>
    </div>
  );
};
