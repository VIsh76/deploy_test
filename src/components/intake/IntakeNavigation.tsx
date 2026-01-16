import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * INTAKE NAVIGATION FOOTER
 * 
 * UX Decision: Fixed footer with clear primary/secondary actions.
 * "Save & exit" always visible to reduce abandonment anxiety.
 * "Continue" is prominent; "Back" is subtle but accessible.
 */

interface IntakeNavigationProps {
  onBack: () => void;
  onNext: () => void;
  onSaveExit: () => void;
  canGoBack: boolean;
  isLastStep: boolean;
  isNextDisabled?: boolean;
  isSaving?: boolean;
}

const IntakeNavigation = ({
  onBack,
  onNext,
  onSaveExit,
  canGoBack,
  isLastStep,
  isNextDisabled = false,
  isSaving = false,
}: IntakeNavigationProps) => (
  <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-6 border-t border-border">
    <div className="flex items-center gap-3 w-full sm:w-auto">
      {canGoBack && (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      )}
      
      <Button
        type="button"
        variant="outline"
        onClick={onSaveExit}
        disabled={isSaving}
        className="text-muted-foreground"
      >
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "Saving..." : "Save & exit"}
      </Button>
    </div>
    
    <Button
      type="button"
      onClick={onNext}
      disabled={isNextDisabled}
      className="w-full sm:w-auto"
      variant="cta"
    >
      {isLastStep ? "Review answers" : "Continue"}
      {!isLastStep && <ArrowRight className="w-4 h-4 ml-2" />}
    </Button>
  </div>
);

export default IntakeNavigation;
