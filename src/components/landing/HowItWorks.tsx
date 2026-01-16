/**
 * How It Works Section
 * 
 * 3 simple steps in plain English.
 * No legal jargon - focuses on what the user does, not technical details.
 */

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step = ({ number, title, description }: StepProps) => (
  <div className="premium-card text-left">
    <div className="step-badge mb-3">{number}</div>
    <h3 className="font-black text-base tracking-tight mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export const HowItWorks = () => {
  return (
    <section id="how" className="mt-24 scroll-mt-8">
      <div className="text-center mb-8">
        <h2 className="text-section text-foreground mb-2">How Recourse works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A guided flow: choose your path → answer plain-English questions → get a checklist → download your filing-ready packet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Step
          number={1}
          title="Choose your NYC path"
          description="Money claim (Small Claims or Civil Court) or repairs/conditions (HP Action). We'll help you pick the right one."
        />
        <Step
          number={2}
          title="Answer simple questions"
          description="We guide you through a clean timeline and evidence checklist tailored to your situation. No legal jargon."
        />
        <Step
          number={3}
          title="Download your packet"
          description="Get organized documents and step-by-step filing instructions. Ready to file at the courthouse."
        />
      </div>
    </section>
  );
};
