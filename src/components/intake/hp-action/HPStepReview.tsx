import IntakeCard from "@/components/intake/IntakeCard";
import { HPActionFormData } from "@/hooks/useHPActionForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Edit2, AlertTriangle, CheckCircle2 } from "lucide-react";

/**
 * HP ACTION STEP 7: REVIEW & CONFIRMATION
 * 
 * Shows court-style preview of all collected information.
 * Requires affirmation checkbox before proceeding.
 */

interface Props {
  formData: HPActionFormData;
  onUpdate: <K extends keyof HPActionFormData>(field: K, value: HPActionFormData[K]) => void;
  onEditStep: (step: number) => void;
  errors: Record<string, string>;
}

const TIME_SLOT_LABELS: Record<string, string> = {
  weekday_9_1: "Weekday 9 AM – 1 PM",
  weekday_12_5: "Weekday 12 PM – 5 PM",
  weekday_4_9: "Weekday 4 PM – 9 PM",
  weekend_9_5: "Weekend 9 AM – 5 PM",
};

const BOROUGH_LABELS: Record<string, string> = {
  manhattan: "Manhattan",
  brooklyn: "Brooklyn",
  bronx: "Bronx",
  queens: "Queens",
  staten_island: "Staten Island",
};

const HPStepReview = ({ formData, onUpdate, onEditStep, errors }: Props) => {
  return (
    <div className="space-y-6">
      {/* Important Notice */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-foreground mb-1">Almost done!</p>
            <p className="text-muted-foreground">
              Review your information below. This will be used to generate your official 
              Tenant's Request for Inspection form.
            </p>
          </div>
        </div>
      </div>

      {/* Tenant Information */}
      <IntakeCard>
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-foreground">Your Information</h3>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(2)} className="text-primary">
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{formData.tenantName || "—"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="text-muted-foreground">Address</span>
            <span className="font-medium text-right">
              {formData.apartmentAddress && `${formData.apartmentAddress}, `}
              {formData.apartmentNumber && `Apt ${formData.apartmentNumber}, `}
              {formData.floor && `Floor ${formData.floor}`}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="text-muted-foreground">Borough</span>
            <span className="font-medium">{formData.borough ? BOROUGH_LABELS[formData.borough] : "—"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="text-muted-foreground">Phone</span>
            <span className="font-medium">{formData.phoneHome || "—"}</span>
          </div>
          {formData.tenantEmail && (
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{formData.tenantEmail}</span>
            </div>
          )}
        </div>
      </IntakeCard>

      {/* Child Under Six */}
      <IntakeCard>
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-foreground">Child Under Six</h3>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(3)} className="text-primary">
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium">
              {formData.childUnderSix === "no" && "No child under 6"}
              {formData.childUnderSix === "lives_here" && "Child lives here"}
              {formData.childUnderSix === "visits_10hrs" && "Child visits regularly"}
            </span>
          </div>
          {(formData.childUnderSix === "lives_here" || formData.childUnderSix === "visits_10hrs") && (
            <>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Child's name</span>
                <span className="font-medium">{formData.childName || "—"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Age/DOB</span>
                <span className="font-medium">{formData.childAge || "—"}</span>
              </div>
            </>
          )}
        </div>
      </IntakeCard>

      {/* Access Information */}
      <IntakeCard>
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-foreground">Inspection Access</h3>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(4)} className="text-primary">
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="text-muted-foreground">Contact for access</span>
            <span className="font-medium">
              {formData.accessContact === "tenant" && "Tenant (you)"}
              {formData.accessContact === "super" && "Building super"}
              {formData.accessContact === "other" && formData.accessContactName}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Contact phone</span>
            <span className="font-medium">{formData.accessContactPhone || formData.phoneHome || "—"}</span>
          </div>
        </div>
      </IntakeCard>

      {/* Inspection Times */}
      <IntakeCard>
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-foreground">Available Times</h3>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(5)} className="text-primary">
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.inspectionTimes.map((time) => (
            <span
              key={time}
              className="px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full font-medium"
            >
              {TIME_SLOT_LABELS[time]}
            </span>
          ))}
          {formData.inspectionTimes.length === 0 && (
            <span className="text-muted-foreground text-sm">No times selected</span>
          )}
        </div>
      </IntakeCard>

      {/* Conditions */}
      <IntakeCard>
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-bold text-foreground">Conditions Reported</h3>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(6)} className="text-primary">
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
        <div className="space-y-3">
          {formData.conditions.length === 0 ? (
            <p className="text-muted-foreground text-sm">No conditions added</p>
          ) : (
            formData.conditions.map((condition, index) => (
              <div key={condition.id} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary">#{index + 1}</span>
                  <span className="text-xs text-muted-foreground">
                    {condition.location === "apartment" ? condition.room : "Public area"}
                  </span>
                </div>
                <p className="text-sm text-foreground">{condition.description}</p>
              </div>
            ))
          )}
        </div>
      </IntakeCard>

      {/* Request Date */}
      <IntakeCard>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Date of Request</span>
          <span className="font-medium">{new Date().toLocaleDateString()}</span>
        </div>
      </IntakeCard>

      {/* Affirmation Checkbox */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-start gap-3">
          <Checkbox
            id="affirmation"
            checked={formData.tenantAffirmation}
            onCheckedChange={(checked) => onUpdate("tenantAffirmation", !!checked)}
            className="mt-0.5"
          />
          <div>
            <Label htmlFor="affirmation" className="text-sm font-medium text-amber-900 cursor-pointer">
              I confirm that the information above is accurate to the best of my knowledge
            </Label>
            <p className="text-xs text-amber-700 mt-1">
              This acts as your signature acknowledgment on the inspection request form.
            </p>
          </div>
        </div>
        {errors.tenantAffirmation && (
          <p className="text-sm text-destructive flex items-center gap-2 mt-3">
            <AlertTriangle className="w-4 h-4" />
            {errors.tenantAffirmation}
          </p>
        )}
      </div>

      {/* Legal Disclaimer */}
      <div className="p-4 border border-border rounded-xl">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Disclaimer:</strong> Recourse is not a law firm and does not provide legal advice. 
          This tool provides procedural guidance and helps you prepare forms based on information you provide. 
          You remain the decision-maker in your case.
        </p>
      </div>
    </div>
  );
};

export default HPStepReview;
