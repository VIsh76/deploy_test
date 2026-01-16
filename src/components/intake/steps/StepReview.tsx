import { Pencil, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import IntakeCard from "../IntakeCard";
import { IntakeFormData } from "@/hooks/useIntakeForm";
import { format } from "date-fns";

/**
 * STEP 7: REVIEW ANSWERS
 * 
 * UX Decision: Let users see everything before proceeding.
 * Edit buttons on each section for easy corrections.
 * Reduces "did I make a mistake" anxiety.
 */

interface StepReviewProps {
  formData: IntakeFormData;
  onEditStep: (step: number) => void;
}

interface ReviewSectionProps {
  title: string;
  stepNumber: number;
  onEdit: () => void;
  children: React.ReactNode;
}

const ReviewSection = ({ title, stepNumber, onEdit, children }: ReviewSectionProps) => (
  <IntakeCard>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-green-500" />
        <h3 className="font-bold text-foreground">{title}</h3>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="text-primary hover:text-primary-dark -mr-2"
      >
        <Pencil className="w-4 h-4 mr-1" />
        Edit
      </Button>
    </div>
    <dl className="space-y-2 text-sm">
      {children}
    </dl>
  </IntakeCard>
);

const ReviewItem = ({ label, value }: { label: string; value: string | undefined }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-2">
      <dt className="text-muted-foreground shrink-0">{label}:</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
};

const StepReview = ({ formData, onEditStep }: StepReviewProps) => {
  const claimAmount = parseFloat(formData.depositAmount || "0") - parseFloat(formData.amountReturned || "0");

  return (
    <div className="space-y-4">
      {/* Summary highlight */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Security Deposit Claim</p>
            <p className="text-2xl font-bold text-foreground">
              ${claimAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">NYC Small Claims Court</p>
          </div>
        </div>
      </div>

      <ReviewSection title="Case Details" stepNumber={2} onEdit={() => onEditStep(2)}>
        <ReviewItem 
          label="Move-out date" 
          value={formData.moveOutDate ? format(formData.moveOutDate, "MMMM d, yyyy") : undefined} 
        />
        <ReviewItem 
          label="Security deposit" 
          value={formData.depositAmount ? `$${parseFloat(formData.depositAmount).toLocaleString()}` : undefined} 
        />
        <ReviewItem 
          label="Amount returned" 
          value={formData.amountReturned !== "" ? `$${parseFloat(formData.amountReturned).toLocaleString()}` : undefined} 
        />
      </ReviewSection>

      <ReviewSection title="Landlord Information" stepNumber={3} onEdit={() => onEditStep(3)}>
        <ReviewItem label="Name" value={formData.landlordName} />
        <ReviewItem label="Type" value={formData.landlordType === "individual" ? "Individual" : "Company/LLC"} />
        <ReviewItem label="Property address" value={formData.propertyAddress} />
        <ReviewItem label="Mailing address" value={formData.landlordAddress} />
      </ReviewSection>

      <ReviewSection title="What Happened" stepNumber={4} onEdit={() => onEditStep(4)}>
        <ReviewItem 
          label="Itemized statement" 
          value={
            formData.receivedItemizedStatement === "yes" ? "Yes, received" :
            formData.receivedItemizedStatement === "no" ? "No, never received" :
            formData.receivedItemizedStatement === "partial" ? "Incomplete/vague" : undefined
          } 
        />
        {formData.deductionReasons && formData.deductionReasons.length > 0 && (
          <ReviewItem 
            label="Deduction reasons" 
            value={formData.deductionReasons.join(", ")} 
          />
        )}
      </ReviewSection>

      <ReviewSection title="Your Evidence" stepNumber={5} onEdit={() => onEditStep(5)}>
        <ReviewItem label="Photos" value={formData.hasPhotos === "yes" ? "Yes" : "No"} />
        <ReviewItem label="Receipts" value={formData.hasReceipts === "yes" ? "Yes" : "No"} />
        {formData.additionalDamages && (
          <ReviewItem label="Additional notes" value={formData.additionalDamages} />
        )}
      </ReviewSection>

      <ReviewSection title="Contact Information" stepNumber={6} onEdit={() => onEditStep(6)}>
        <ReviewItem label="Name" value={formData.yourName} />
        <ReviewItem label="Email" value={formData.yourEmail} />
        <ReviewItem label="Phone" value={formData.yourPhone || "Not provided"} />
      </ReviewSection>

      <p className="text-xs text-muted-foreground/70 text-center pt-4">
        Please review your answers carefully. You can edit any section before proceeding.
      </p>
    </div>
  );
};

export default StepReview;
