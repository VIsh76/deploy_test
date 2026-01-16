import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ Section
 * 
 * Addresses common concerns directly and honestly.
 * Conservative language - no overpromising.
 */

const faqs = [
  {
    question: "Is Recourse a law firm?",
    answer: "No. Recourse is not a law firm and does not provide legal advice. We provide general information, document preparation support, and procedural guidance. You make the final decisions about your case."
  },
  {
    question: "Can Recourse guarantee I'll win my case?",
    answer: "No. We cannot guarantee any outcome. What we can do is help you organize your facts, prepare your documents correctly, and understand the filing process. The final decision rests with the court."
  },
  {
    question: "What happens if I need to stop and come back later?",
    answer: "Your progress is automatically saved in your browser. When you return, you'll see a \"Continue where you left off\" option that takes you right back to where you stopped."
  },
  {
    question: "What courts does Recourse support?",
    answer: "Currently, we focus on NYC housing claims: Small Claims Court (up to $10,000), Civil Court ($10,000–$50,000), and Housing Court HP Actions (repairs and conditions). We're expanding to other jurisdictions soon."
  },
  {
    question: "Do I still need to go to court?",
    answer: "Yes. Recourse helps you prepare your documents and understand the process, but you'll still need to file your paperwork and appear in court. We give you clear instructions for each step."
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="mt-24 scroll-mt-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-section text-foreground mb-2">Frequently asked questions</h2>
        <p className="text-muted-foreground">
          Quick answers to common concerns.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-2.5">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`faq-${index}`}
            className="premium-card border-none px-5 py-0"
          >
            <AccordionTrigger className="text-left font-black text-foreground hover:no-underline py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
