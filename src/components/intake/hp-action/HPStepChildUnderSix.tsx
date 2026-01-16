import IntakeCard from "@/components/intake/IntakeCard";
import IntakeQuestion from "@/components/intake/IntakeQuestion";
import IntakeOption from "@/components/intake/IntakeOption";
import IntakeTextField from "@/components/intake/IntakeTextField";
import { HPActionFormData } from "@/hooks/useHPActionForm";
import { AlertCircle } from "lucide-react";

/**
 * HP ACTION STEP 3: CHILD UNDER SIX
 * 
 * Critical compliance step — mirrors exact logic from CIV-LT-61.
 * NYC law has specific lead paint protections for young children.
 */

interface Props {
  formData: HPActionFormData;
  onUpdate: <K extends keyof HPActionFormData>(field: K, value: HPActionFormData[K]) => void;
  errors: Record<string, string>;
}

const HPStepChildUnderSix = ({ formData, onUpdate, errors }: Props) => {
  const showChildDetails = formData.childUnderSix === "lives_here" || formData.childUnderSix === "visits_10hrs";

  return (
    <div className="space-y-8">
      {/* Why This Matters - Lead Paint Context */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-foreground mb-1">Why we ask this</p>
            <p className="text-muted-foreground">
              NYC has special lead paint inspection rules when young children are present. 
              Landlords must take extra precautions, and HPD prioritizes these inspections. 
              This information is required on the official form.
            </p>
          </div>
        </div>
      </div>

      {/* Child Under Six Question */}
      <IntakeCard>
        <IntakeQuestion
          question="Does a child under six years old live here or regularly spend time here?"
          helperText="'Regularly' means more than 10 hours per week on average."
          error={errors.childUnderSix}
        >
          <div className="space-y-3">
            <IntakeOption
              label="No"
              description="No children under 6 live here or visit regularly"
              selected={formData.childUnderSix === "no"}
              onClick={() => {
                onUpdate("childUnderSix", "no");
                onUpdate("childName", "");
                onUpdate("childAge", "");
              }}
            />
            <IntakeOption
              label="Yes — child lives here"
              description="A child under 6 resides in this apartment"
              selected={formData.childUnderSix === "lives_here"}
              onClick={() => onUpdate("childUnderSix", "lives_here")}
            />
            <IntakeOption
              label="Yes — child visits regularly"
              description="A child under 6 spends more than 10 hours/week here"
              selected={formData.childUnderSix === "visits_10hrs"}
              onClick={() => onUpdate("childUnderSix", "visits_10hrs")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      {/* Child Details (conditional) */}
      {showChildDetails && (
        <IntakeCard>
          <IntakeQuestion
            question="Information about the youngest child"
            helperText="If multiple children under 6 are present, provide info for the youngest."
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Child's first name
                </label>
                <IntakeTextField
                  value={formData.childName}
                  onChange={(val) => onUpdate("childName", val)}
                  placeholder="e.g., Sofia"
                  error={!!errors.childName}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Age or date of birth
                </label>
                <IntakeTextField
                  value={formData.childAge}
                  onChange={(val) => onUpdate("childAge", val)}
                  placeholder="e.g., 3 years old"
                  error={!!errors.childAge}
                />
              </div>
            </div>
          </IntakeQuestion>
        </IntakeCard>
      )}
    </div>
  );
};

export default HPStepChildUnderSix;
