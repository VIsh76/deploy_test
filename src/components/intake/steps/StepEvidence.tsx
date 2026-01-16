import IntakeCard from "../IntakeCard";
import IntakeQuestion from "../IntakeQuestion";
import IntakeOption from "../IntakeOption";
import IntakeTextField from "../IntakeTextField";
import { IntakeFormData } from "@/hooks/useIntakeForm";

/**
 * STEP 5: YOUR EVIDENCE
 * 
 * UX Decision: Understand what documentation they have.
 * This affects case strength and what we recommend they gather.
 */

interface StepEvidenceProps {
  formData: IntakeFormData;
  onUpdate: <K extends keyof IntakeFormData>(field: K, value: IntakeFormData[K]) => void;
  errors: Record<string, string>;
}

const StepEvidence = ({ formData, onUpdate, errors }: StepEvidenceProps) => {
  return (
    <div className="space-y-6">
      <IntakeCard>
        <IntakeQuestion
          question="Do you have photos of the apartment?"
          helperText="Move-in or move-out photos help prove the condition of the apartment. Even phone photos are valuable."
          error={errors.hasPhotos}
        >
          <div className="space-y-3">
            <IntakeOption
              label="Yes, I have photos"
              description="Move-in photos, move-out photos, or both"
              selected={formData.hasPhotos === "yes"}
              onClick={() => onUpdate("hasPhotos", "yes")}
            />
            <IntakeOption
              label="No photos"
              description="I don't have photos of the apartment"
              selected={formData.hasPhotos === "no"}
              onClick={() => onUpdate("hasPhotos", "no")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      <IntakeCard>
        <IntakeQuestion
          question="Do you have receipts from your tenancy?"
          helperText="Rent payments, lease agreement, security deposit receipt — anything showing what you paid."
          error={errors.hasReceipts}
        >
          <div className="space-y-3">
            <IntakeOption
              label="Yes, I have receipts"
              description="Bank statements, canceled checks, or payment receipts"
              selected={formData.hasReceipts === "yes"}
              onClick={() => onUpdate("hasReceipts", "yes")}
            />
            <IntakeOption
              label="No receipts"
              description="I don't have payment records"
              selected={formData.hasReceipts === "no"}
              onClick={() => onUpdate("hasReceipts", "no")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      <IntakeCard>
        <IntakeQuestion
          question="Is there anything else we should know?"
          helperText="Optional: Any other details about your situation that might be relevant. Keep it brief."
        >
          <IntakeTextField
            type="textarea"
            value={formData.additionalDamages}
            onChange={(value) => onUpdate("additionalDamages", value)}
            placeholder="For example: 'Landlord also kept my last month's rent which was supposed to cover the final month.'"
            rows={4}
            maxLength={500}
          />
        </IntakeQuestion>
      </IntakeCard>

      {/* Reassurance based on evidence */}
      {formData.hasPhotos === "no" && formData.hasReceipts === "no" && (
        <div className="bg-secondary/50 border border-border rounded-xl p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Don't worry: </span>
            You can still file a claim without photos or receipts. 
            Bank statements often work as proof of payment. We'll help you figure out what you need.
          </p>
        </div>
      )}
    </div>
  );
};

export default StepEvidence;
