import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Home } from "lucide-react";
import { useHPActionForm, HPActionFormData } from "@/hooks/useHPActionForm";

// Progress & Layout
import IntakeProgress from "@/components/intake/IntakeProgress";
import IntakeNavigation from "@/components/intake/IntakeNavigation";
import IntakeDisclaimer from "@/components/intake/IntakeDisclaimer";

// Step Components
import HPStepEligibility from "@/components/intake/hp-action/HPStepEligibility";
import HPStepTenantInfo from "@/components/intake/hp-action/HPStepTenantInfo";
import HPStepChildUnderSix from "@/components/intake/hp-action/HPStepChildUnderSix";
import HPStepAccess from "@/components/intake/hp-action/HPStepAccess";
import HPStepInspectionTimes from "@/components/intake/hp-action/HPStepInspectionTimes";
import HPStepConditions from "@/components/intake/hp-action/HPStepConditions";
import HPStepReview from "@/components/intake/hp-action/HPStepReview";
import HPStepComplete from "@/components/intake/hp-action/HPStepComplete";

/**
 * HP ACTION INTAKE PAGE
 * 
 * Multi-step wizard for NYC housing conditions / HPD inspection request.
 * Based on official CIV-LT-61 form structure.
 */

const STEP_LABELS = ["Eligibility", "Your Info", "Child <6", "Access", "Times", "Conditions", "Review", "Done"];
const TOTAL_STEPS = 8;

const HPActionIntake = () => {
  const navigate = useNavigate();
  const { 
    formData, 
    updateField, 
    updateStep, 
    addCondition, 
    updateCondition, 
    removeCondition,
    lastAutoSave 
  } = useHPActionForm();
  
  const [currentStep, setCurrentStep] = useState(formData.currentStep || 1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation per step
  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Eligibility
        if (!formData.isNYCProperty) newErrors.isNYCProperty = "Please select an option";
        if (!formData.isTenantOrOccupant) newErrors.isTenantOrOccupant = "Please select an option";
        if (!formData.isCurrentCondition) newErrors.isCurrentCondition = "Please select an option";
        if (!formData.hasExistingCase) newErrors.hasExistingCase = "Please select an option";
        // Block if ineligible
        if (formData.isNYCProperty === "no" || formData.isTenantOrOccupant === "no" || formData.isCurrentCondition === "no") {
          newErrors.eligibility = "Based on your answers, HP Action may not be the right path.";
        }
        break;
      case 2: // Tenant Info
        if (!formData.tenantName.trim()) newErrors.tenantName = "Please enter your name";
        if (!formData.apartmentAddress.trim()) newErrors.apartmentAddress = "Please enter the address";
        if (!formData.borough) newErrors.borough = "Please select your borough";
        if (!formData.phoneHome.trim()) newErrors.phoneHome = "Please enter a phone number";
        break;
      case 3: // Child Under Six
        if (!formData.childUnderSix) newErrors.childUnderSix = "Please select an option";
        if ((formData.childUnderSix === "lives_here" || formData.childUnderSix === "visits_10hrs") && !formData.childName.trim()) {
          newErrors.childName = "Please enter the child's name";
        }
        break;
      case 4: // Access
        if (!formData.accessContact) newErrors.accessContact = "Please select who can provide access";
        if (formData.accessContact && formData.accessContact !== "tenant") {
          if (!formData.accessContactName.trim()) newErrors.accessContactName = "Please enter contact name";
          if (!formData.accessContactPhone.trim()) newErrors.accessContactPhone = "Please enter contact phone";
        }
        break;
      case 5: // Inspection Times
        if (formData.inspectionTimes.length === 0) newErrors.inspectionTimes = "Please select at least one time window";
        break;
      case 6: // Conditions
        if (formData.conditions.length === 0) newErrors.conditions = "Please add at least one condition";
        // Check that all conditions have descriptions
        const incompleteCondition = formData.conditions.find(c => !c.description.trim());
        if (incompleteCondition) newErrors.conditions = "Please complete the description for all conditions";
        break;
      case 7: // Review
        if (!formData.tenantAffirmation) newErrors.tenantAffirmation = "Please confirm the information is accurate";
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
        return <HPStepEligibility formData={formData} onUpdate={updateField} errors={errors} />;
      case 2:
        return <HPStepTenantInfo formData={formData} onUpdate={updateField} errors={errors} />;
      case 3:
        return <HPStepChildUnderSix formData={formData} onUpdate={updateField} errors={errors} />;
      case 4:
        return <HPStepAccess formData={formData} onUpdate={updateField} errors={errors} />;
      case 5:
        return <HPStepInspectionTimes formData={formData} onUpdate={updateField} errors={errors} />;
      case 6:
        return (
          <HPStepConditions 
            formData={formData} 
            onUpdate={updateField} 
            addCondition={addCondition}
            updateCondition={updateCondition}
            removeCondition={removeCondition}
            errors={errors} 
          />
        );
      case 7:
        return <HPStepReview formData={formData} onUpdate={updateField} onEditStep={handleEditStep} errors={errors} />;
      case 8:
        return <HPStepComplete />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Let's make sure this is the right path";
      case 2: return "Your information";
      case 3: return "Child under six?";
      case 4: return "Access for inspection";
      case 5: return "When are you available?";
      case 6: return "What conditions need inspection?";
      case 7: return "Review your request";
      case 8: return "Your request is ready";
      default: return "";
    }
  };

  // Final step has different layout
  if (currentStep === TOTAL_STEPS) {
    return (
      <div className="min-h-screen pb-16">
        <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container max-w-2xl py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </Link>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                <Home className="w-3.5 h-3.5" />
                HP Action
              </span>
            </div>
          </div>
        </header>

        <main className="container max-w-2xl py-8">
          <HPStepComplete />
        </main>
      </div>
    );
  }

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
                <Home className="w-3.5 h-3.5" />
                HP Action
              </span>
              <span>•</span>
              <span>Housing Conditions</span>
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

        {/* Disclaimer at key points */}
        {(currentStep === 1 || currentStep === 6) && (
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
          isLastStep={currentStep === TOTAL_STEPS - 1}
        />
      </main>
    </div>
  );
};

export default HPActionIntake;
