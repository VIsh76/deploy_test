import IntakeCard from "../IntakeCard";
import IntakeQuestion from "../IntakeQuestion";
import IntakeDatePicker from "../IntakeDatePicker";
import IntakeCurrencyInput from "../IntakeCurrencyInput";
import { IntakeFormData } from "@/hooks/useIntakeForm";

/**
 * STEP 2: BASIC CASE INFO
 * 
 * UX Decision: Start with concrete, easy-to-answer questions.
 * Dates and amounts are facts users know, building momentum.
 */

interface StepBasicInfoProps {
  formData: IntakeFormData;
  onUpdate: <K extends keyof IntakeFormData>(field: K, value: IntakeFormData[K]) => void;
  errors: Record<string, string>;
}

const StepBasicInfo = ({ formData, onUpdate, errors }: StepBasicInfoProps) => {
  return (
    <div className="space-y-6">
      <IntakeCard>
        <IntakeQuestion
          question="When did you move out?"
          helperText="We need this to calculate important deadlines. In NYC, landlords have 14 days after move-out to return your deposit."
          error={errors.moveOutDate}
        >
          <IntakeDatePicker
            value={formData.moveOutDate}
            onChange={(date) => onUpdate("moveOutDate", date)}
            placeholder="Select your move-out date"
            maxDate={new Date()}
            error={!!errors.moveOutDate}
          />
        </IntakeQuestion>
      </IntakeCard>

      <IntakeCard>
        <IntakeQuestion
          question="How much was your security deposit?"
          helperText="This is usually one month's rent. Check your original lease if you're not sure."
          error={errors.depositAmount}
        >
          <IntakeCurrencyInput
            value={formData.depositAmount}
            onChange={(value) => onUpdate("depositAmount", value)}
            placeholder="2,500.00"
            error={!!errors.depositAmount}
          />
        </IntakeQuestion>
      </IntakeCard>

      <IntakeCard>
        <IntakeQuestion
          question="How much did your landlord return?"
          helperText="Enter $0 if they haven't returned anything. If they returned some, enter that amount."
          error={errors.amountReturned}
        >
          <IntakeCurrencyInput
            value={formData.amountReturned}
            onChange={(value) => onUpdate("amountReturned", value)}
            placeholder="0.00"
            error={!!errors.amountReturned}
          />
        </IntakeQuestion>
      </IntakeCard>

      {/* Show calculated claim amount for reassurance */}
      {formData.depositAmount && formData.amountReturned !== "" && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Your potential claim: </span>
            ${(parseFloat(formData.depositAmount || "0") - parseFloat(formData.amountReturned || "0")).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  );
};

export default StepBasicInfo;
