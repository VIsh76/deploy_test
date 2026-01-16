import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Home, Scale } from "lucide-react";

/**
 * Start/Path Selection Page
 * 
 * This is where users choose their claim type.
 * Connects to the intake flow.
 */

interface PathCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  onClick: () => void;
  available?: boolean;
}

const PathCard = ({ icon, tag, title, description, onClick, available = true }: PathCardProps) => (
  <button
    onClick={onClick}
    disabled={!available}
    className={`premium-card text-left w-full transition-all duration-150 cursor-pointer ${
      available 
        ? "hover:-translate-y-0.5 hover:shadow-medium" 
        : "opacity-60 cursor-not-allowed"
    }`}
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <span className="inline-flex items-center text-xs font-black text-primary-dark bg-primary/10 border border-primary/18 px-2 py-1 rounded-full mb-2">
          {tag}
        </span>
        <h3 className="font-black text-lg tracking-tight mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        {!available && (
          <span className="text-xs text-muted-foreground/60 mt-2 block">Coming soon</span>
        )}
      </div>
    </div>
  </button>
);

const Start = () => {
  const navigate = useNavigate();

  const handlePathSelect = (path: string) => {
    if (path === "small_claims") {
      // Save case type and navigate to security deposit intake
      localStorage.setItem("recourse_case_type", path);
      navigate("/intake");
    } else if (path === "hp_action") {
      // Navigate to HP Action intake flow
      localStorage.setItem("recourse_case_type", path);
      navigate("/hp-action");
    } else {
      // Civil court coming soon
      alert("This claim type is coming soon. For now, please select Security Deposit Claim or HP Action.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container max-w-2xl py-8">
        {/* Back link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-hero text-foreground mb-3">
          Choose your claim type
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
          Select the option that best describes your situation. Not sure? 
          Start with whichever seems closest — you can adjust later.
        </p>

        <div className="space-y-4">
          <PathCard
            icon={<FileText className="w-6 h-6 text-primary" />}
            tag="Money • ≤ $10k"
            title="Security deposit claim"
            description="Your landlord didn't return your deposit, made improper deductions, or returned it late. We'll help you file in Small Claims Court."
            onClick={() => handlePathSelect("small_claims")}
          />
          
          <PathCard
            icon={<Home className="w-6 h-6 text-primary" />}
            tag="Repairs • Conditions"
            title="Unsafe or Unlivable Conditions (HP Action)"
            description="Heat, mold, leaks, lead paint, no repairs, code violations. Request an HPD inspection and prepare for Housing Court."
            onClick={() => handlePathSelect("hp_action")}
          />
          
          <PathCard
            icon={<Scale className="w-6 h-6 text-primary" />}
            tag="Money • $10k–$50k"
            title="Larger money dispute"
            description="For claims above Small Claims limits. Unpaid wages, contract disputes, or other money owed. Civil Court process."
            onClick={() => handlePathSelect("civil_court")}
          />
        </div>

        <p className="text-xs text-muted-foreground/70 mt-8 leading-relaxed">
          Recourse is not a law firm and does not provide legal advice. 
          We provide document preparation and procedural guidance.
        </p>
      </div>
    </div>
  );
};

export default Start;
