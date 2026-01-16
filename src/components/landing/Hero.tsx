import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Hero Section
 * 
 * Key UX decisions:
 * - Headline focuses on outcome ("claim your deposit") not process
 * - Subheadline addresses fear (mistakes, confusion) with reassurance
 * - Trust pills visible immediately to build credibility
 * - Single primary CTA with secondary "How it works" for skeptical users
 * - Disclaimer visible but not distracting
 */
export const Hero = () => {
  return (
    <section className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-6 items-start">
      {/* Main hero content */}
      <div className="animate-fade-in">
        <h1 className="text-hero text-foreground mb-3">
          Get your security deposit back —<br className="hidden sm:block" />
          the right way
        </h1>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-2xl">
          Recourse guides you through NYC's small claims process step by step. 
          Answer simple questions, get court-ready documents, and file with confidence.
        </p>

        {/* Trust signals - immediately visible */}
        <div className="flex flex-wrap gap-2.5 mb-5" aria-label="Trust and safety cues">
          <span className="trust-pill">
            <span className="trust-pill-dot" />
            NYC housing-focused
          </span>
          <span className="trust-pill">
            <span className="trust-pill-dot" />
            ~10–15 min guided intake
          </span>
          <span className="trust-pill">
            <span className="trust-pill-dot" />
            Save & resume anytime
          </span>
        </div>

        {/* Value bullets - what you'll accomplish */}
        <ul className="space-y-2.5 mb-6 text-muted-foreground">
          <li className="flex gap-2.5 items-start">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/25 mt-2 shrink-0" />
            <span><strong className="text-foreground">Choose the right path</strong> — Small Claims, Civil Court, or Housing Court</span>
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/25 mt-2 shrink-0" />
            <span><strong className="text-foreground">Get an evidence checklist</strong> — so you don't miss key documents</span>
          </li>
          <li className="flex gap-2.5 items-start">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/25 mt-2 shrink-0" />
            <span><strong className="text-foreground">Download court-ready forms</strong> — organized and ready to file</span>
          </li>
        </ul>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <Button variant="cta" size="lg" asChild>
            <Link to="/start">
              Start My Claim
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="ctaSecondary" size="lg" asChild>
            <a href="#how">How it works</a>
          </Button>
        </div>

        {/* Legal disclaimer - required, but styled to not alarm */}
        <p className="text-xs text-muted-foreground/70 max-w-xl leading-relaxed">
          Recourse is not a law firm and does not provide legal advice. 
          We provide general information, document preparation support, and procedural guidance. 
          You make the final decisions.
        </p>
      </div>

      {/* Side confidence card */}
      <aside 
        className="premium-card sticky top-5 animate-fade-in hidden lg:block"
        style={{ animationDelay: "0.1s" }}
        aria-label="What you'll get"
      >
        <h3 className="font-black text-[15px] mb-2 tracking-tight">What you'll get</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          A guided intake, a tailored checklist, and a filing-ready packet for your NYC housing claim.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          <MetricCard label="3 paths" value="Small Claims • Civil • HP Action" />
          <MetricCard label="Auto-save" value="Continue anytime" />
          <MetricCard label="Checklist" value="Evidence + timeline" />
          <MetricCard label="Packet" value="Download & file" />
        </div>
      </aside>
    </section>
  );
};

const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-border rounded-xl p-3 bg-card/70">
    <div className="font-black text-base tracking-tight">{label}</div>
    <div className="text-xs text-muted-foreground mt-1 leading-snug">{value}</div>
  </div>
);
