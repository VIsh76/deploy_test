import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * INTAKE DATE PICKER
 * 
 * UX Decision: Calendar picker with clear formatting.
 * Reduces data entry errors for dates (critical for legal documents).
 */

interface IntakeDatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  /**
   * Accepts boolean OR a string message (common pattern: errors[field])
   * so callers can pass the same value used for <IntakeQuestion error={...}/>.
   */
  error?: boolean | string;
  maxDate?: Date;
  minDate?: Date;
}

const IntakeDatePicker = ({
  value,
  onChange,
  placeholder = "Select a date",
  error = false,
  maxDate,
  minDate,
}: IntakeDatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal text-base py-6 px-4 rounded-xl border-2",
            !value && "text-muted-foreground",
            error ? "border-destructive" : "border-border"
          )}
        >
          <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground" />
          {value ? format(value, "MMMM d, yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
          disabled={(date) => {
            if (maxDate && date > maxDate) return true;
            if (minDate && date < minDate) return true;
            return false;
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default IntakeDatePicker;
