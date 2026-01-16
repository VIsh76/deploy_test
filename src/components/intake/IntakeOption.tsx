import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * INTAKE OPTION (Radio/Checkbox styled as cards)
 * 
 * UX Decision: Large, tappable option cards instead of tiny radio buttons.
 * - Reduces mis-taps on mobile
 * - Clearer selection state
 * - More reassuring than clinical form elements
 */

interface IntakeOptionProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const IntakeOption = ({ 
  label, 
  description, 
  selected, 
  onClick,
  disabled = false
}: IntakeOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "w-full text-left p-4 rounded-xl border-2 transition-all duration-150",
      "hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20",
      selected 
        ? "border-primary bg-primary/5" 
        : "border-border bg-card",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    <div className="flex items-start gap-3">
      {/* Custom checkbox indicator */}
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all",
          selected 
            ? "border-primary bg-primary" 
            : "border-muted-foreground/30"
        )}
      >
        {selected && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <span className={cn(
          "font-semibold text-foreground block",
          selected && "text-primary-dark"
        )}>
          {label}
        </span>
        {description && (
          <span className="text-sm text-muted-foreground mt-0.5 block">
            {description}
          </span>
        )}
      </div>
    </div>
  </button>
);

export default IntakeOption;
