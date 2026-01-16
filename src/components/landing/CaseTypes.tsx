import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Case Types Section
 * 
 * Shows the three main claim paths with clear, plain-English descriptions.
 * Each card is actionable with a primary CTA.
 */

interface CaseCardProps {
  tag: string;
  title: string;
  description: string;
  path: string;
}

const CaseCard = ({ tag, title, description, path }: CaseCardProps) => (
  <div className="premium-card flex flex-col min-h-[200px]">
    <span className="inline-flex items-center gap-2 text-xs font-black text-primary-dark bg-primary/10 border border-primary/18 px-2.5 py-1.5 rounded-full w-fit">
      {tag}
    </span>
    <h3 className="font-black text-base tracking-tight mt-3 mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
      {description}
    </p>
    <div className="flex gap-2.5 flex-wrap mt-auto">
      <Button variant="cta" size="sm" asChild>
        <Link to={`/start?path=${path}`}>Start</Link>
      </Button>
      <Button variant="ctaSecondary" size="sm" asChild>
        <a href="#how">How it works</a>
      </Button>
    </div>
  </div>
);

export const CaseTypes = () => {
  return (
    <section id="cases" className="mt-24 scroll-mt-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-section text-foreground text-center mb-2">
          Start with a common NYC housing claim
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8 leading-relaxed">
          Choose the path that matches your situation. We'll guide you through the right process.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CaseCard
            tag="Money • ≤ $10k"
            title="Security deposit"
            description="Missing return, improper deductions, late return. Generate a demand letter + small claims packet."
            path="small_claims"
          />
          <CaseCard
            tag="Repairs • Conditions"
            title="No heat / mold / leaks (HP Action)"
            description="For repairs and unsafe conditions. Build a conditions packet for NYC Housing Court."
            path="hp_action"
          />
          <CaseCard
            tag="Money • $10k–$50k"
            title="Larger disputes"
            description="For money claims above small claims limits. Prepare a Civil Court-ready packet."
            path="civil_court"
          />
        </div>
      </div>
    </section>
  );
};
