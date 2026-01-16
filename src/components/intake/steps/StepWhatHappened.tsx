import IntakeCard from "../IntakeCard";
import IntakeQuestion from "../IntakeQuestion";
import IntakeOption from "../IntakeOption";
import { IntakeFormData } from "@/hooks/useIntakeForm";

/**
 * STEP 4: WHAT HAPPENED
 * 
 * UX Decision: Multiple choice questions to understand the dispute.
 * These determine case strength and proper filing approach.
 */

interface StepWhatHappenedProps {
  formData: IntakeFormData;
  onUpdate: <K extends keyof IntakeFormData>(field: K, value: IntakeFormData[K]) => void;
  errors: Record<string, string>;
}

const deductionOptions = [
  { id: "cleaning", label: "Cleaning fees", description: "Charged for cleaning beyond normal wear" },
  { id: "damage", label: "Damage repairs", description: "Holes, broken fixtures, stains, etc." },
  { id: "unpaid_rent", label: "Unpaid rent", description: "They claim you owe back rent" },
  { id: "painting", label: "Painting/repainting", description: "Charged to repaint walls" },
  { id: "other", label: "Other deductions", description: "Fees not listed above" },
  { id: "none_given", label: "No reason given", description: "They didn't explain why" },
];

const StepWhatHappened = ({ formData, onUpdate, errors }: StepWhatHappenedProps) => {
  const toggleDeduction = (id: string) => {
    const current = formData.deductionReasons || [];
    if (current.includes(id)) {
      onUpdate("deductionReasons", current.filter((r) => r !== id));
    } else {
      onUpdate("deductionReasons", [...current, id]);
    }
  };

  return (
    <div className="space-y-6">
      <IntakeCard>
        <IntakeQuestion
          question="Did your landlord send you an itemized statement?"
          helperText="In NYC, landlords MUST send a written list of any deductions within 14 days. This is a key legal requirement."
          error={errors.receivedItemizedStatement}
        >
          <div className="space-y-3">
            <IntakeOption
              label="Yes, I received one"
              description="They sent a written breakdown of deductions"
              selected={formData.receivedItemizedStatement === "yes"}
              onClick={() => onUpdate("receivedItemizedStatement", "yes")}
            />
            <IntakeOption
              label="No, I never received anything"
              description="No letter, email, or statement at all"
              selected={formData.receivedItemizedStatement === "no"}
              onClick={() => onUpdate("receivedItemizedStatement", "no")}
            />
            <IntakeOption
              label="Sort of — it was incomplete"
              description="Received something, but vague or missing details"
              selected={formData.receivedItemizedStatement === "partial"}
              onClick={() => onUpdate("receivedItemizedStatement", "partial")}
            />
          </div>
        </IntakeQuestion>
      </IntakeCard>

      {/* Conditional: Only show if they received a statement */}
      {(formData.receivedItemizedStatement === "yes" || formData.receivedItemizedStatement === "partial") && (
        <IntakeCard>
          <IntakeQuestion
            question="What reasons did they give for keeping your money?"
            helperText="Select all that apply. This helps us evaluate if the deductions are legally valid."
            error={errors.deductionReasons}
          >
            <div className="space-y-3">
              {deductionOptions.map((option) => (
                <IntakeOption
                  key={option.id}
                  label={option.label}
                  description={option.description}
                  selected={formData.deductionReasons?.includes(option.id) || false}
                  onClick={() => toggleDeduction(option.id)}
                />
              ))}
            </div>
          </IntakeQuestion>
        </IntakeCard>
      )}

      {/* Case strength indicator based on answers */}
      {formData.receivedItemizedStatement === "no" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in">
          <p className="text-sm text-green-800">
            <span className="font-semibold">Good to know: </span>
            In NYC, if a landlord doesn't provide an itemized statement within 14 days, 
            they may forfeit the right to keep any of your deposit.
          </p>
        </div>
      )}
    </div>
  );
};

export default StepWhatHappened;
