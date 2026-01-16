import { cn } from "@/lib/utils";

/**
 * INTAKE CARD WRAPPER
 * 
 * UX Decision: Each question appears in a clean, elevated card.
 * This creates visual focus and reduces cognitive load by 
 * isolating one task at a time.
 */

interface IntakeCardProps {
  children: React.ReactNode;
  className?: string;
}

const IntakeCard = ({ children, className }: IntakeCardProps) => (
  <div
    className={cn(
      "premium-card animate-fade-in",
      className
    )}
  >
    {children}
  </div>
);

export default IntakeCard;
