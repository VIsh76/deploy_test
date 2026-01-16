import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

/**
 * INTAKE CURRENCY INPUT
 * 
 * UX Decision: Formatted currency input with clear $ prefix.
 * Auto-formats as user types to reduce errors.
 */

interface IntakeCurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /**
   * Accepts boolean OR a string message (common pattern: errors[field])
   * so callers can pass the same value used for <IntakeQuestion error={...}/>.
   */
  error?: boolean | string;
  autoFocus?: boolean;
}

const IntakeCurrencyInput = ({
  value,
  onChange,
  placeholder = "0.00",
  error = false,
  autoFocus = false,
}: IntakeCurrencyInputProps) => {
  // Format input as currency (numbers only)
  const handleChange = (input: string) => {
    // Remove non-numeric characters except decimal
    const cleaned = input.replace(/[^0-9.]/g, "");
    // Ensure only one decimal point
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) return;
    onChange(cleaned);
  };

  // Format display value with commas
  const formatDisplay = (val: string): string => {
    if (!val) return "";
    const parts = val.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-lg">
        $
      </span>
      <Input
        type="text"
        inputMode="decimal"
        value={formatDisplay(value)}
        onChange={(e) => handleChange(e.target.value.replace(/,/g, ""))}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          "text-lg py-6 pl-8 pr-4 rounded-xl border-2 transition-all font-semibold",
          "focus:ring-2 focus:ring-primary/20 focus:border-primary",
          error ? "border-destructive" : "border-border"
        )}
      />
    </div>
  );
};

export default IntakeCurrencyInput;
