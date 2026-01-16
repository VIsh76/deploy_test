import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * INTAKE PROGRESS INDICATOR
 * 
 * UX Decision: Shows numbered steps with completion state.
 * This gives users a clear sense of progress and reduces anxiety
 * by showing exactly how much work remains.
 */

interface IntakeProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const IntakeProgress = ({ currentStep, totalSteps, stepLabels }: IntakeProgressProps) => {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Mobile: Simple progress bar with step count */}
      <div className="md:hidden">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-bold text-foreground">Step {currentStep} of {totalSteps}</span>
          <span className="text-muted-foreground">{stepLabels[currentStep - 1]}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Desktop: Step indicators with labels */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Progress line behind steps */}
          <div className="absolute left-0 right-0 top-4 h-0.5 bg-secondary" />
          <div 
            className="absolute left-0 top-4 h-0.5 bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />

          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <div key={label} className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-secondary text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium transition-colors",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IntakeProgress;
