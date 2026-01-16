import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * INTAKE QUESTION COMPONENT
 * 
 * UX Decision: Each question has a clear structure:
 * 1. Question text (large, bold)
 * 2. Helper text (explains WHY this matters)
 * 3. Input field
 * 
 * Helper text reduces anxiety by giving context.
 */

interface IntakeQuestionProps {
  question: string;
  helperText?: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}

const IntakeQuestion = ({ 
  question, 
  helperText, 
  children, 
  error,
  className 
}: IntakeQuestionProps) => (
  <div className={cn("space-y-4", className)}>
    <div className="space-y-2">
      <h2 className="text-xl font-bold text-foreground leading-snug">
        {question}
      </h2>
      {helperText && (
        <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-primary/60" />
          <span>{helperText}</span>
        </p>
      )}
    </div>
    
    <div className="pt-2">
      {children}
    </div>
    
    {/* Gentle error message - non-alarming styling */}
    {error && (
      <p className="text-sm text-destructive flex items-center gap-2 animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
        {error}
      </p>
    )}
  </div>
);

export default IntakeQuestion;
