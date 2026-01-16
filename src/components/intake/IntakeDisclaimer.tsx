import { Shield } from "lucide-react";

/**
 * INTAKE DISCLAIMER
 * 
 * UX Decision: Conservative, reassuring disclaimer shown at key points.
 * Placed at natural pauses (not blocking flow) to maintain trust.
 */

interface IntakeDisclaimerProps {
  variant?: "subtle" | "prominent";
}

const IntakeDisclaimer = ({ variant = "subtle" }: IntakeDisclaimerProps) => {
  if (variant === "prominent") {
    return (
      <div className="bg-secondary/50 border border-border rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="font-semibold text-foreground mb-1">
              This does not submit anything yet
            </p>
            <p>
              Recourse is not a law firm and does not provide legal advice. 
              We help you organize facts, prepare documents, and understand filing steps. 
              You make the final decisions about your case.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <p className="text-xs text-muted-foreground/70 leading-relaxed text-center">
      Your answers are saved locally and are not shared until you choose to proceed.
    </p>
  );
};

export default IntakeDisclaimer;
