import IntakeCard from "@/components/intake/IntakeCard";
import IntakeQuestion from "@/components/intake/IntakeQuestion";
import IntakeOption from "@/components/intake/IntakeOption";
import { HPActionFormData } from "@/hooks/useHPActionForm";
import { AlertTriangle, Info } from "lucide-react";

/**
 * HP ACTION STEP 1: ELIGIBILITY
 * 
 * Ensures HP Action is the right path before collecting detailed info.
 * Shows clear alternative paths if not eligible.
 */

interface Props {
  formData: HPActionFormData;
  onUpdate: <K extends keyof HPActionFormData>(field: K, value: HPActionFormData[K]) => void;
  errors: Record<string, string>;
}

const HPStepEligibility = ({ formData, onUpdate, errors }: Props) => {
  // Check if user is NOT eligible
  const isIneligible = 
    formData.isNYCProperty === "no" ||
    formData.isTenantOrOccupant === "no" ||
    formData.isCurrentCondition === "no";

  return (
    <div className="space-y-8">
      {/* NYC Property Check */}
      <IntakeCard>
        <IntakeQuestion
          question="Is the property located in New York City?"
          helperText="HP Actions can only be filed in NYC Housing Court for properties in the five boroughs."
          error={errors.isNYCProperty}
        >
          <div className="grid grid-cols-2 gap-3">
            <IntakeOption
              label="Yes, in NYC"
              selected={formData.isNYCProperty === "yes"}
              onClick={() => onUpdate("isNYCProperty", "yes")}
            />
            <IntakeOption
              label="No"
              selected={formData.isNYCProperty === "no"}
              onClick={() => onUpdate("isNYCProperty", "no")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      {/* Tenant/Occupant Check */}
      <IntakeCard>
        <IntakeQuestion
          question="Are you a tenant or occupant of this apartment?"
          helperText="You must be someone who currently lives in the unit to request an HPD inspection."
          error={errors.isTenantOrOccupant}
        >
          <div className="grid grid-cols-2 gap-3">
            <IntakeOption
              label="Yes"
              selected={formData.isTenantOrOccupant === "yes"}
              onClick={() => onUpdate("isTenantOrOccupant", "yes")}
            />
            <IntakeOption
              label="No"
              selected={formData.isTenantOrOccupant === "no"}
              onClick={() => onUpdate("isTenantOrOccupant", "no")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      {/* Current Conditions Check */}
      <IntakeCard>
        <IntakeQuestion
          question="Are you reporting current housing conditions?"
          helperText="HP Actions address ongoing problems like no heat, leaks, or mold — not past damages you're seeking money for."
          error={errors.isCurrentCondition}
        >
          <div className="grid grid-cols-2 gap-3">
            <IntakeOption
              label="Yes, current issues"
              selected={formData.isCurrentCondition === "yes"}
              onClick={() => onUpdate("isCurrentCondition", "yes")}
            />
            <IntakeOption
              label="No, past damages"
              selected={formData.isCurrentCondition === "no"}
              onClick={() => onUpdate("isCurrentCondition", "no")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      {/* Existing Case Check */}
      <IntakeCard>
        <IntakeQuestion
          question="Have you already filed a Housing Court case for these same conditions?"
          helperText="If you have an existing case, you may need to update that case rather than start a new one."
          error={errors.hasExistingCase}
        >
          <div className="grid grid-cols-2 gap-3">
            <IntakeOption
              label="No existing case"
              selected={formData.hasExistingCase === "no"}
              onClick={() => onUpdate("hasExistingCase", "no")}
            />
            <IntakeOption
              label="Yes, I have a case"
              selected={formData.hasExistingCase === "yes"}
              onClick={() => onUpdate("hasExistingCase", "yes")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      {/* Ineligibility Warning */}
      {isIneligible && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-2">
                HP Action may not be the right path
              </p>
              <ul className="text-sm text-amber-800 space-y-1">
                {formData.isNYCProperty === "no" && (
                  <li>• HP Actions only apply to NYC properties. For other locations, contact your local housing authority.</li>
                )}
                {formData.isTenantOrOccupant === "no" && (
                  <li>• Only current tenants or occupants can file an HP Action.</li>
                )}
                {formData.isCurrentCondition === "no" && (
                  <li>• For past damages and money owed, consider a Small Claims case instead.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Existing Case Info */}
      {formData.hasExistingCase === "yes" && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-foreground">
              <p className="font-semibold mb-1">You may already have a case</p>
              <p className="text-muted-foreground">
                If your existing case is still open, you can request an additional inspection through that case. 
                However, if new conditions have developed, you can still proceed with a new inspection request.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HPStepEligibility;
