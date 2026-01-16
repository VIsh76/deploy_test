import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { CaseTypes } from "@/components/landing/CaseTypes";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { MobileCTA } from "@/components/landing/MobileCTA";

/**
 * Recourse Landing Page
 * 
 * Target audience: NYC tenants with housing disputes (security deposits, repairs, etc.)
 * who are stressed, non-technical, and unfamiliar with legal processes.
 * 
 * Design goals:
 * 1. Build trust immediately (calm colors, clear disclaimers, no hype)
 * 2. Clarity of value in <10 seconds (headline + trust pills)
 * 3. Easy path to action (prominent CTA, mobile sticky bar)
 * 4. Address fears directly (FAQ, conservative language throughout)
 */
const Index = () => {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="container max-w-5xl">
        <Header />
        <Hero />
        <CaseTypes />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
      <MobileCTA />
    </div>
  );
};

export default Index;
