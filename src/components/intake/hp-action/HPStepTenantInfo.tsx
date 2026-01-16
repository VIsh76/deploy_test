import IntakeCard from "@/components/intake/IntakeCard";
import IntakeQuestion from "@/components/intake/IntakeQuestion";
import IntakeTextField from "@/components/intake/IntakeTextField";
import IntakeOption from "@/components/intake/IntakeOption";
import { HPActionFormData } from "@/hooks/useHPActionForm";

/**
 * HP ACTION STEP 2: TENANT INFORMATION
 * 
 * Collects tenant details matching the CIV-LT-61 form fields.
 * Fields auto-format for court document generation.
 */

interface Props {
  formData: HPActionFormData;
  onUpdate: <K extends keyof HPActionFormData>(field: K, value: HPActionFormData[K]) => void;
  errors: Record<string, string>;
}

const BOROUGHS = [
  { value: "manhattan", label: "Manhattan" },
  { value: "brooklyn", label: "Brooklyn" },
  { value: "bronx", label: "Bronx" },
  { value: "queens", label: "Queens" },
  { value: "staten_island", label: "Staten Island" },
] as const;

const HPStepTenantInfo = ({ formData, onUpdate, errors }: Props) => {
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

  return (
    <div className="space-y-8">
      {/* Full Name */}
      <IntakeCard>
        <IntakeQuestion
          question="What is your full legal name?"
          helperText="This will appear on the official inspection request form exactly as you type it."
          error={errors.tenantName}
        >
          <IntakeTextField
            value={formData.tenantName}
            onChange={(val) => onUpdate("tenantName", val)}
            placeholder="e.g., Maria Santos"
          />
        </IntakeQuestion>
      </IntakeCard>

      {/* Address */}
      <IntakeCard>
        <IntakeQuestion
          question="What is the address of the apartment?"
          helperText="Enter the street address where the conditions exist."
          error={errors.apartmentAddress}
        >
          <IntakeTextField
            value={formData.apartmentAddress}
            onChange={(val) => onUpdate("apartmentAddress", val)}
            placeholder="e.g., 123 Main Street"
          />
        </IntakeQuestion>
      </IntakeCard>

      {/* Apt & Floor */}
      <IntakeCard>
        <IntakeQuestion
          question="Apartment number and floor"
          helperText="This helps HPD inspectors find your unit."
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Apartment #
              </label>
              <IntakeTextField
                value={formData.apartmentNumber}
                onChange={(val) => onUpdate("apartmentNumber", val)}
                placeholder="e.g., 4B"
                error={!!errors.apartmentNumber}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Floor
              </label>
              <IntakeTextField
                value={formData.floor}
                onChange={(val) => onUpdate("floor", val)}
                placeholder="e.g., 4th"
                error={!!errors.floor}
              />
            </div>
          </div>
        </IntakeQuestion>
      </IntakeCard>

      {/* Borough */}
      <IntakeCard>
        <IntakeQuestion
          question="Which borough is the apartment in?"
          helperText="This determines which Housing Court location will handle your case."
          error={errors.borough}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BOROUGHS.map((borough) => (
              <IntakeOption
                key={borough.value}
                label={borough.label}
                selected={formData.borough === borough.value}
                onClick={() => onUpdate("borough", borough.value)}
              />
            ))}
          </div>
        </IntakeQuestion>
      </IntakeCard>

      {/* Contact Info */}
      <IntakeCard>
        <IntakeQuestion
          question="How can the court reach you?"
          helperText="HPD may need to contact you to schedule the inspection."
        >
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Email (optional but recommended)
              </label>
              <IntakeTextField
                value={formData.tenantEmail}
                onChange={(val) => onUpdate("tenantEmail", val)}
                placeholder="you@email.com"
                type="email"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Home phone
                </label>
                <IntakeTextField
                  value={formData.phoneHome}
                  onChange={(val) => onUpdate("phoneHome", formatPhone(val))}
                  placeholder="(212) 555-1234"
                  error={!!errors.phoneHome}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Work phone (optional)
                </label>
                <IntakeTextField
                  value={formData.phoneWork}
                  onChange={(val) => onUpdate("phoneWork", formatPhone(val))}
                  placeholder="(212) 555-5678"
                />
              </div>
            </div>
          </div>
        </IntakeQuestion>
      </IntakeCard>
    </div>
  );
};

export default HPStepTenantInfo;
