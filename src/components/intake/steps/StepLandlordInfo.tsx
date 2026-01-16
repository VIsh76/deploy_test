import IntakeCard from "../IntakeCard";
import IntakeQuestion from "../IntakeQuestion";
import IntakeTextField from "../IntakeTextField";
import IntakeOption from "../IntakeOption";
import { IntakeFormData } from "@/hooks/useIntakeForm";

/**
 * STEP 3: LANDLORD INFORMATION
 * 
 * UX Decision: We need accurate info to serve papers correctly.
 * Explain WHY we need each piece to reduce "why are you asking" anxiety.
 */

interface StepLandlordInfoProps {
  formData: IntakeFormData;
  onUpdate: <K extends keyof IntakeFormData>(field: K, value: IntakeFormData[K]) => void;
  errors: Record<string, string>;
}

const StepLandlordInfo = ({ formData, onUpdate, errors }: StepLandlordInfoProps) => {
  return (
    <div className="space-y-6">
      <IntakeCard>
        <IntakeQuestion
          question="Is your landlord a person or a company?"
          helperText="This affects how we address the legal papers. Check your lease — the landlord is listed at the top."
          error={errors.landlordType}
        >
          <div className="space-y-3">
            <IntakeOption
              label="Individual person"
              description="A person's name (e.g., 'John Smith')"
              selected={formData.landlordType === "individual"}
              onClick={() => onUpdate("landlordType", "individual")}
            />
            <IntakeOption
              label="Company or LLC"
              description="A business name (e.g., 'ABC Properties LLC')"
              selected={formData.landlordType === "company"}
              onClick={() => onUpdate("landlordType", "company")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      <IntakeCard>
        <IntakeQuestion
          question={formData.landlordType === "company" ? "What is the company name?" : "What is your landlord's name?"}
          helperText="This should match exactly what's on your lease. Spelling matters for legal documents."
          error={errors.landlordName}
        >
          <IntakeTextField
            value={formData.landlordName}
            onChange={(value) => onUpdate("landlordName", value)}
            placeholder={formData.landlordType === "company" ? "ABC Properties LLC" : "John Smith"}
            error={!!errors.landlordName}
          />
        </IntakeQuestion>
      </IntakeCard>

      <IntakeCard>
        <IntakeQuestion
          question="What was the address of your rental?"
          helperText="The apartment you moved out of. Include unit number if applicable."
          error={errors.propertyAddress}
        >
          <IntakeTextField
            type="textarea"
            value={formData.propertyAddress}
            onChange={(value) => onUpdate("propertyAddress", value)}
            placeholder="123 Main Street, Apt 4B&#10;Brooklyn, NY 11201"
            rows={3}
            error={!!errors.propertyAddress}
          />
        </IntakeQuestion>
      </IntakeCard>

      <IntakeCard>
        <IntakeQuestion
          question="Where should court papers be sent to your landlord?"
          helperText="Usually their office or home address. If different from the rental property, you can find this on your lease or rent checks."
          error={errors.landlordAddress}
        >
          <IntakeTextField
            type="textarea"
            value={formData.landlordAddress}
            onChange={(value) => onUpdate("landlordAddress", value)}
            placeholder="Same as rental property, or enter different address"
            rows={3}
            error={!!errors.landlordAddress}
          />
        </IntakeQuestion>
      </IntakeCard>
    </div>
  );
};

export default StepLandlordInfo;
