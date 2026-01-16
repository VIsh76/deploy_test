import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntakeForm, IntakeFormData } from "@/hooks/useIntakeForm";

// Progress & Layout
import IntakeProgress from "@/components/intake/IntakeProgress";
import IntakeNavigation from "@/components/intake/IntakeNavigation";
import IntakeDisclaimer from "@/components/intake/IntakeDisclaimer";

// Step Components
import StepBasicInfo from "@/components/intake/steps/StepBasicInfo";
import StepLandlordInfo from "@/components/intake/steps/StepLandlordInfo";
import StepWhatHappened from "@/components/intake/steps/StepWhatHappened";
import StepEvidence from "@/components/intake/steps/StepEvidence";
import StepContactInfo from "@/components/intake/steps/StepContactInfo";
import StepReview from "@/components/intake/steps/StepReview";

/**
 * INTAKE PAGE
 * 
 * Multi-step wizard for security deposit claims.
 * 
 * UX Principles:
 * - One concept per screen where possible
 * - Clear progress indication
 * - Auto-save to prevent data loss
 * - Gentle validation with clear recovery paths
 * - Reassuring microcopy throughout
 */

const STEP_LABELS = ["Details", "Landlord", "Situation", "Evidence", "You", "Review"];
const TOTAL_STEPS = 6;

const Intake = () => {
  const navigate = useNavigate();
  const { formData, updateField, updateStep, lastAutoSave } = useIntakeForm();
  const [currentStep, setCurrentStep] = useState(formData.currentStep || 1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation per step
  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Basic Info
        if (!formData.moveOutDate) newErrors.moveOutDate = "Please select your move-out date";
        if (!formData.depositAmount) newErrors.depositAmount = "Please enter your deposit amount";
        if (formData.amountReturned === "") newErrors.amountReturned = "Please enter the amount returned (or $0)";
        break;
      case 2: // Landlord Info
        if (!formData.landlordType) newErrors.landlordType = "Please select landlord type";
        if (!formData.landlordName.trim()) newErrors.landlordName = "Please enter landlord name";
        if (!formData.propertyAddress.trim()) newErrors.propertyAddress = "Please enter the property address";
        break;
      case 3: // What Happened
        if (!formData.receivedItemizedStatement) newErrors.receivedItemizedStatement = "Please select an option";
        break;
      case 4: // Evidence
        if (!formData.hasPhotos) newErrors.hasPhotos = "Please select an option";
        if (!formData.hasReceipts) newErrors.hasReceipts = "Please select an option";
        break;
      case 5: // Contact Info
        if (!formData.yourName.trim()) newErrors.yourName = "Please enter your full legal name";
        if (!formData.yourEmail.trim()) newErrors.yourEmail = "Please enter your email address";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.yourEmail)) {
          newErrors.yourEmail = "Please enter a valid email address";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        updateStep(nextStep);
        setErrors({});
        window.scrollTo(0, 0);
      } else {
        // Final step — proceed to payment/checkout
        console.log("Proceeding to checkout with:", formData);
        alert("Ready to proceed! In the full product, this would go to document generation & payment.");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      window.scrollTo(0, 0);
    }
  };

  const handleSaveExit = () => {
    // Data is already auto-saved, just navigate away
    navigate("/");
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepBasicInfo formData={formData} onUpdate={updateField} errors={errors} />;
      case 2:
        return <StepLandlordInfo formData={formData} onUpdate={updateField} errors={errors} />;
      case 3:
        return <StepWhatHappened formData={formData} onUpdate={updateField} errors={errors} />;
      case 4:
        return <StepEvidence formData={formData} onUpdate={updateField} errors={errors} />;
      case 5:
        return <StepContactInfo formData={formData} onUpdate={updateField} errors={errors} />;
      case 6:
        return <StepReview formData={formData} onEditStep={handleEditStep} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Let's start with the basics";
      case 2: return "About your landlord";
      case 3: return "What happened?";
      case 4: return "What evidence do you have?";
      case 5: return "Your contact information";
      case 6: return "Review your answers";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-2xl py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit
            </Link>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                NYC Housing
              </span>
              <span>•</span>
              <span>Security Deposit</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl py-8">
        {/* Progress */}
        <div className="mb-8">
          <IntakeProgress 
            currentStep={currentStep} 
            totalSteps={TOTAL_STEPS}
            stepLabels={STEP_LABELS}
          />
        </div>

        {/* Step Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {getStepTitle()}
          </h1>
          {/* Auto-save indicator */}
          {lastAutoSave && (
            <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Auto-saved {lastAutoSave.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Subtle disclaimer at natural pauses */}
        {currentStep === 3 && (
          <div className="mb-6">
            <IntakeDisclaimer variant="subtle" />
          </div>
        )}

        {/* Navigation */}
        <IntakeNavigation
          onBack={handleBack}
          onNext={handleNext}
          onSaveExit={handleSaveExit}
          canGoBack={currentStep > 1}
          isLastStep={currentStep === TOTAL_STEPS}
        />
      </main>
    </div>
  );
};

export default Intake;
