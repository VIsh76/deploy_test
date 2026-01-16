import IntakeCard from "@/components/intake/IntakeCard";
import IntakeQuestion from "@/components/intake/IntakeQuestion";
import { HPActionFormData } from "@/hooks/useHPActionForm";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

/**
 * HP ACTION STEP 5: INSPECTION AVAILABILITY
 * 
 * Mirrors the CIV-LT-61 time slots exactly.
 * Borough-aware hints help users understand which times are available.
 */

interface Props {
  formData: HPActionFormData;
  onUpdate: <K extends keyof HPActionFormData>(field: K, value: HPActionFormData[K]) => void;
  errors: Record<string, string>;
}

interface TimeSlot {
  id: string;
  label: string;
  description: string;
  type: "weekday" | "weekend";
  boroughs: string[];
}

const TIME_SLOTS: TimeSlot[] = [
  {
    id: "weekday_9_1",
    label: "Weekday: 9 AM – 1 PM",
    description: "Available in all boroughs",
    type: "weekday",
    boroughs: ["manhattan", "brooklyn", "bronx", "queens", "staten_island"],
  },
  {
    id: "weekday_12_5",
    label: "Weekday: 12 PM – 5 PM",
    description: "Manhattan, Brooklyn, Bronx, Queens",
    type: "weekday",
    boroughs: ["manhattan", "brooklyn", "bronx", "queens"],
  },
  {
    id: "weekday_4_9",
    label: "Weekday: 4 PM – 9 PM",
    description: "Manhattan, Brooklyn, Bronx only",
    type: "weekday",
    boroughs: ["manhattan", "brooklyn", "bronx"],
  },
  {
    id: "weekend_9_5",
    label: "Weekend: 9 AM – 5 PM",
    description: "Manhattan, Brooklyn, Bronx only",
    type: "weekend",
    boroughs: ["manhattan", "brooklyn", "bronx"],
  },
];

const HPStepInspectionTimes = ({ formData, onUpdate, errors }: Props) => {
  const toggleTimeSlot = (slotId: string) => {
    const current = formData.inspectionTimes || [];
    const updated = current.includes(slotId)
      ? current.filter((id) => id !== slotId)
      : [...current, slotId];
    onUpdate("inspectionTimes", updated);
  };

  // Filter available slots based on borough
  const getAvailableSlots = () => {
    if (!formData.borough) return TIME_SLOTS;
    return TIME_SLOTS.filter((slot) => slot.boroughs.includes(formData.borough));
  };

  const availableSlots = getAvailableSlots();
  const unavailableSlots = TIME_SLOTS.filter((slot) => !availableSlots.includes(slot));

  return (
    <div className="space-y-8">
      {/* Guidance */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-foreground mb-1">Select your available times</p>
            <p className="text-muted-foreground">
              Check all the time windows when someone can let the inspector in. 
              Selecting more options increases the chance of a quick inspection.
            </p>
          </div>
        </div>
      </div>

      <IntakeCard>
        <IntakeQuestion
          question="When is someone available for the inspection?"
          helperText="The inspector will come during one of your selected windows."
          error={errors.inspectionTimes}
        >
          <div className="space-y-4">
            {/* Weekday Times */}
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                Weekday Options
              </p>
              <div className="space-y-3">
                {availableSlots
                  .filter((slot) => slot.type === "weekday")
                  .map((slot) => (
                    <div
                      key={slot.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                        formData.inspectionTimes.includes(slot.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                      onClick={() => toggleTimeSlot(slot.id)}
                    >
                      <Checkbox
                        id={slot.id}
                        checked={formData.inspectionTimes.includes(slot.id)}
                        onCheckedChange={() => toggleTimeSlot(slot.id)}
                        className="mt-0.5"
                      />
                      <div>
                        <Label htmlFor={slot.id} className="font-semibold text-foreground cursor-pointer">
                          {slot.label}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-0.5">{slot.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Weekend Times */}
            {availableSlots.some((slot) => slot.type === "weekend") && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                  Weekend Options
                </p>
                <div className="space-y-3">
                  {availableSlots
                    .filter((slot) => slot.type === "weekend")
                    .map((slot) => (
                      <div
                        key={slot.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                          formData.inspectionTimes.includes(slot.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40"
                        }`}
                        onClick={() => toggleTimeSlot(slot.id)}
                      >
                        <Checkbox
                          id={slot.id}
                          checked={formData.inspectionTimes.includes(slot.id)}
                          onCheckedChange={() => toggleTimeSlot(slot.id)}
                          className="mt-0.5"
                        />
                        <div>
                          <Label htmlFor={slot.id} className="font-semibold text-foreground cursor-pointer">
                            {slot.label}
                          </Label>
                          <p className="text-xs text-muted-foreground mt-0.5">{slot.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Unavailable slots (if borough limits options) */}
            {formData.borough && unavailableSlots.length > 0 && (
              <div className="pt-2">
                <p className="text-xs text-muted-foreground/60">
                  Some time slots aren't available in {formData.borough === "staten_island" ? "Staten Island" : formData.borough.charAt(0).toUpperCase() + formData.borough.slice(1)}.
                </p>
              </div>
            )}
          </div>
        </IntakeQuestion>
      </IntakeCard>
    </div>
  );
};

export default HPStepInspectionTimes;
