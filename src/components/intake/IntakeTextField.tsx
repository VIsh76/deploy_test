import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * INTAKE TEXT FIELD
 * 
 * UX Decision: Large, comfortable input fields with clear focus states.
 * Supports both single-line and multi-line inputs.
 */

interface IntakeTextFieldProps {
  type?: "text" | "email" | "tel" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  /**
   * Accepts boolean OR a string message (common pattern: errors[field])
   * so callers can pass the same value used for <IntakeQuestion error={...}/>.
   */
  error?: boolean | string;
  autoFocus?: boolean;
}

const IntakeTextField = ({
  type = "text",
  value,
  onChange,
  placeholder,
  maxLength,
  rows = 4,
  error = false,
  autoFocus = false,
}: IntakeTextFieldProps) => {
  const baseClasses = cn(
    "text-base py-3 px-4 rounded-xl border-2 transition-all",
    "focus:ring-2 focus:ring-primary/20 focus:border-primary",
    error ? "border-destructive" : "border-border"
  );

  if (type === "textarea") {
    return (
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          autoFocus={autoFocus}
          className={baseClasses}
        />
        {maxLength && (
          <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    );
  }

  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      autoFocus={autoFocus}
      className={baseClasses}
    />
  );
};

export default IntakeTextField;
