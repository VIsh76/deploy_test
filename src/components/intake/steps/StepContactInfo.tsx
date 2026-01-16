import IntakeCard from "../IntakeCard";
import IntakeQuestion from "../IntakeQuestion";
import IntakeTextField from "../IntakeTextField";
import IntakeDisclaimer from "../IntakeDisclaimer";
import { IntakeFormData } from "@/hooks/useIntakeForm";

/**
 * STEP 6: YOUR CONTACT INFO
 * 
 * UX Decision: Contact info last — users are more invested now.
 * By this point they've answered case questions and are committed.
 */

interface StepContactInfoProps {
  formData: IntakeFormData;
  onUpdate: <K extends keyof IntakeFormData>(field: K, value: IntakeFormData[K]) => void;
  errors: Record<string, string>;
}

const StepContactInfo = ({ formData, onUpdate, errors }: StepContactInfoProps) => {
  return (
    <div className="space-y-6">
      <IntakeCard>
        <IntakeQuestion
          question="What's your full legal name?"
          helperText="This will appear on court documents exactly as you enter it. Use your full legal name."
          error={errors.yourName}
        >
          <IntakeTextField
            value={formData.yourName}
            onChange={(value) => onUpdate("yourName", value)}
            placeholder="Jane Marie Smith"
            error={!!errors.yourName}
          />
        </IntakeQuestion>
      </IntakeCard>

      <IntakeCard>
        <IntakeQuestion
          question="What's your email address?"
          helperText="We'll send you a copy of your completed documents and any updates about your case."
          error={errors.yourEmail}
        >
          <IntakeTextField
            type="email"
            value={formData.yourEmail}
            onChange={(value) => onUpdate("yourEmail", value)}
            placeholder="jane@example.com"
            error={!!errors.yourEmail}
          />
        </IntakeQuestion>
      </IntakeCard>

      <IntakeCard>
        <IntakeQuestion
          question="What's your phone number?"
          helperText="Optional but recommended. The court may need to contact you about your case."
        >
          <IntakeTextField
            type="tel"
            value={formData.yourPhone}
            onChange={(value) => onUpdate("yourPhone", value)}
            placeholder="(555) 123-4567"
          />
        </IntakeQuestion>
      </IntakeCard>

      {/* Final reassurance before review */}
      <IntakeDisclaimer variant="prominent" />
    </div>
  );
};

export default StepContactInfo;
