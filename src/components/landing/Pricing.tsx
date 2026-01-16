import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Pricing Section
 * 
 * Transparent pricing with clear value propositions.
 * Featured plan is highlighted but not pushy.
 */

interface PlanProps {
  title: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: string[];
  featured?: boolean;
  path: string;
}

const PlanCard = ({ title, price, priceSuffix, description, features, featured, path }: PlanProps) => (
  <div className={`premium-card relative ${featured ? "ring-2 ring-primary/22 shadow-medium" : ""}`}>
    {featured && (
      <span className="absolute top-3.5 right-3.5 text-xs font-black text-primary-dark bg-primary/10 border border-primary/18 px-2.5 py-1 rounded-full">
        Most common
      </span>
    )}
    <h3 className="font-black text-base tracking-tight mb-2">{title}</h3>
    <div className="text-3xl font-black tracking-tight mb-1">
      {price}
      <span className="text-xs font-bold text-muted-foreground ml-1">{priceSuffix}</span>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
    <ul className="text-sm text-muted-foreground space-y-1.5 mb-5 list-disc list-inside">
      {features.map((f, i) => (
        <li key={i}>{f}</li>
      ))}
    </ul>
    <div className="flex gap-2.5 flex-wrap">
      <Button variant="cta" size="sm" asChild>
        <Link to={`/start?plan=${path}`}>Start</Link>
      </Button>
      {featured && (
        <Button variant="ctaSecondary" size="sm" asChild>
          <a href="#faq">Questions?</a>
        </Button>
      )}
    </div>
  </div>
);

export const Pricing = () => {
  return (
    <section id="pricing" className="mt-24 scroll-mt-8">
      <div className="text-center mb-8">
        <h2 className="text-section text-foreground mb-2">Simple pricing</h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Start free. Pay only when you're ready to generate documents and a filing checklist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <PlanCard
          title="Screening"
          price="$0"
          priceSuffix="/ start"
          description="Choose the right NYC path and see what you'll need before you commit."
          features={[
            "Path routing (Small Claims / Civil / HP)",
            "Checklist preview",
            "Process overview",
          ]}
          path="screening"
        />
        <PlanCard
          title="File-ready (≤ $10k or HP)"
          price="$39"
          priceSuffix="/ claim"
          description="Guided intake + tailored checklist + packet to download and file."
          features={[
            "Case narrative + exhibits index",
            "Document generation (downloadable)",
            "Filing checklist + next steps",
          ]}
          featured
          path="file_ready"
        />
        <PlanCard
          title="Civil Court ($10k–$50k)"
          price="$99"
          priceSuffix="/ claim"
          description="For larger money disputes. More structure and detailed steps."
          features={[
            "Stronger intake + evidence org",
            "Civil Court-ready packet",
            "Detailed process guidance",
          ]}
          path="civil"
        />
      </div>

      <p className="text-center text-xs text-muted-foreground/70 mt-6 max-w-2xl mx-auto">
        Pricing shown is for current version. Recourse is not a law firm and does not provide legal advice.
      </p>
    </section>
  );
};
