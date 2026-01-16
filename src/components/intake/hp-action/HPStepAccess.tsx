import IntakeCard from "@/components/intake/IntakeCard";
import IntakeQuestion from "@/components/intake/IntakeQuestion";
import IntakeOption from "@/components/intake/IntakeOption";
import IntakeTextField from "@/components/intake/IntakeTextField";
import { HPActionFormData } from "@/hooks/useHPActionForm";
import { Info } from "lucide-react";

/**
 * HP ACTION STEP 4: ACCESS FOR INSPECTION
 * 
 * HPD needs to know who can let the inspector into the apartment.
 * Critical for successful inspections.
 */

interface Props {
  formData: HPActionFormData;
  onUpdate: <K extends keyof HPActionFormData>(field: K, value: HPActionFormData[K]) => void;
  errors: Record<string, string>;
}

const HPStepAccess = ({ formData, onUpdate, errors }: Props) => {
  // Format phone number as user types
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return digits;
  };

  const showContactDetails = formData.accessContact !== "";

  return (
    <div className="space-y-8">
      {/* Important Info */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-foreground mb-1">Why access matters</p>
            <p className="text-muted-foreground">
              HPD inspectors need to enter your apartment to verify conditions. 
              If they can't get in, they may mark "No Access" and you'll need to reschedule. 
              Make sure someone will be available during your chosen inspection times.
            </p>
          </div>
        </div>
      </div>

      {/* Access Contact */}
      <IntakeCard>
        <IntakeQuestion
          question="Who can let the HPD inspector into the apartment?"
          helperText="HPD will contact this person to arrange access."
          error={errors.accessContact}
        >
          <div className="space-y-3">
            <IntakeOption
              label="Me (the tenant)"
              description="I will be available to let the inspector in"
              selected={formData.accessContact === "tenant"}
              onClick={() => {
                onUpdate("accessContact", "tenant");
                onUpdate("accessContactName", formData.tenantName);
                onUpdate("accessContactPhone", formData.phoneHome);
              }}
            />
            <IntakeOption
              label="Building super or staff"
              description="The superintendent or building staff has access"
              selected={formData.accessContact === "super"}
              onClick={() => onUpdate("accessContact", "super")}
            />
            <IntakeOption
              label="Someone else"
              description="A family member, roommate, or other person"
              selected={formData.accessContact === "other"}
              onClick={() => onUpdate("accessContact", "other")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      {/* Contact Details (if not tenant) */}
      {showContactDetails && formData.accessContact !== "tenant" && (
        <IntakeCard>
          <IntakeQuestion
            question="Contact information for access"
            helperText="HPD will call this number to arrange the inspection."
          >
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Contact name
                </label>
                <IntakeTextField
                  value={formData.accessContactName}
                  onChange={(val) => onUpdate("accessContactName", val)}
                  placeholder={formData.accessContact === "super" ? "e.g., Building Super" : "e.g., John Doe"}
                  error={!!errors.accessContactName}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Phone number
                </label>
                <IntakeTextField
                  value={formData.accessContactPhone}
                  onChange={(val) => onUpdate("accessContactPhone", formatPhone(val))}
                  placeholder="(212) 555-1234"
                  error={!!errors.accessContactPhone}
                />
              </div>
            </div>
          </IntakeQuestion>
        </IntakeCard>
      )}
    </div>
  );
};

export default HPStepAccess;
