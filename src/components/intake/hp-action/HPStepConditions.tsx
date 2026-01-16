import IntakeCard from "@/components/intake/IntakeCard";
import IntakeQuestion from "@/components/intake/IntakeQuestion";
import IntakeOption from "@/components/intake/IntakeOption";
import { HPActionFormData, HPCondition } from "@/hooks/useHPActionForm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Lightbulb } from "lucide-react";

/**
 * HP ACTION STEP 6: CONDITIONS BUILDER
 * 
 * User-friendly version of the "Conditions – Be Specific" table from CIV-LT-61.
 * Allows up to 8 conditions as per the form.
 */

interface Props {
  formData: HPActionFormData;
  onUpdate: <K extends keyof HPActionFormData>(field: K, value: HPActionFormData[K]) => void;
  addCondition: () => void;
  updateCondition: (id: string, updates: Partial<HPCondition>) => void;
  removeCondition: (id: string) => void;
  errors: Record<string, string>;
}

const ROOM_OPTIONS = [
  "Kitchen",
  "Bathroom",
  "Bedroom",
  "Living room",
  "Hallway",
  "Closet",
  "Whole apartment",
  "Other",
];

const COMMON_CONDITIONS = [
  "No heat or inadequate heat",
  "No hot water",
  "Water leak from ceiling",
  "Water leak from pipes",
  "Mold or mildew",
  "Pest infestation (roaches, mice, bedbugs)",
  "Broken window",
  "Broken door or lock",
  "Electrical problems",
  "Peeling paint or plaster",
  "Ceiling damage",
  "Floor damage",
  "Clogged drain or toilet",
  "Gas leak or smell",
];

const HPStepConditions = ({ 
  formData, 
  onUpdate, 
  addCondition, 
  updateCondition, 
  removeCondition,
  errors 
}: Props) => {
  const conditions = formData.conditions || [];
  const canAddMore = conditions.length < 8;

  return (
    <div className="space-y-8">
      {/* Guidance */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-amber-900 mb-1">Be specific about each condition</p>
            <p className="text-amber-800">
              The more detail you provide, the better the inspector can evaluate your apartment. 
              Include the room, what's wrong, and any visible damage.
            </p>
            <p className="text-amber-700 mt-2 text-xs">
              Example: "Bathroom ceiling has a large brown water stain and mold growing. Leak comes from upstairs apartment."
            </p>
          </div>
        </div>
      </div>

      {/* Conditions List */}
      {conditions.length === 0 ? (
        <IntakeCard>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You haven't added any conditions yet.
            </p>
            <Button onClick={addCondition} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add first condition
            </Button>
          </div>
        </IntakeCard>
      ) : (
        <div className="space-y-4">
          {conditions.map((condition, index) => (
            <IntakeCard key={condition.id}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    Condition {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCondition(condition.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Location Type */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                    Where is this condition?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <IntakeOption
                      label="In my apartment"
                      selected={condition.location === "apartment"}
                      onClick={() => updateCondition(condition.id, { location: "apartment" })}
                    />
                    <IntakeOption
                      label="Public/common area"
                      selected={condition.location === "public_area"}
                      onClick={() => updateCondition(condition.id, { location: "public_area" })}
                    />
                  </div>
                </div>

                {/* Room */}
                {condition.location === "apartment" && (
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                      Which room?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ROOM_OPTIONS.map((room) => (
                        <button
                          key={room}
                          onClick={() => updateCondition(condition.id, { room })}
                          className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                            condition.room === room
                              ? "border-primary bg-primary/10 text-primary font-semibold"
                              : "border-border text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          {room}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                    Describe the condition in detail
                  </label>
                  <Textarea
                    value={condition.description}
                    onChange={(e) => updateCondition(condition.id, { description: e.target.value })}
                    placeholder="e.g., Large water stain on ceiling above the bathtub. Brown discoloration with visible mold. Leak appears to come from upstairs apartment."
                    className="min-h-[100px] resize-none"
                  />
                </div>

                {/* Common Conditions Suggestions */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                    Quick add common issues:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_CONDITIONS.slice(0, 7).map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          const current = condition.description;
                          const newDesc = current ? `${current}; ${suggestion}` : suggestion;
                          updateCondition(condition.id, { description: newDesc });
                        }}
                        className="px-2 py-1 text-xs rounded-md border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                      >
                        + {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </IntakeCard>
          ))}
        </div>
      )}

      {/* Add More Button */}
      {conditions.length > 0 && canAddMore && (
        <Button onClick={addCondition} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add another condition ({8 - conditions.length} remaining)
        </Button>
      )}

      {/* Max reached */}
      {!canAddMore && (
        <p className="text-xs text-muted-foreground text-center">
          Maximum of 8 conditions per form (as per official HPD form).
        </p>
      )}

      {/* Error */}
      {errors.conditions && (
        <p className="text-sm text-destructive flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
          {errors.conditions}
        </p>
      )}
    </div>
  );
};

export default HPStepConditions;
