import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * HP ACTION STEP 8: COMPLETION & NEXT STEPS
 * 
 * Shows generated document and clear instructions on what happens next.
 */

const HPStepComplete = () => {
  return (
    <div className="space-y-6">
      {/* Success State */}
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your inspection request is ready
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          We've generated your Tenant's Request for Inspection form based on the information you provided.
        </p>
      </div>

      {/* Document Preview Card */}
      <div className="premium-card border-2 border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">Tenant's Request for Inspection</h3>
            <p className="text-sm text-muted-foreground">CIV-LT-61 • Ready to download</p>
          </div>
          <Button variant="cta" size="sm">
            Download PDF
          </Button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h3 className="font-bold text-foreground text-lg">What happens next</h3>
        
        <div className="space-y-3">
          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-sm font-bold">
              1
            </div>
            <div>
              <p className="font-semibold text-foreground">File in Housing Court</p>
              <p className="text-sm text-muted-foreground mt-1">
                Bring your completed form to the Housing Court clerk's office in your borough. 
                Filing is free. The clerk will give you a court date.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-sm font-bold">
              2
            </div>
            <div>
              <p className="font-semibold text-foreground">HPD inspection</p>
              <p className="text-sm text-muted-foreground mt-1">
                An HPD inspector will visit during your selected time windows to verify conditions. 
                Make sure someone is available to let them in.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-sm font-bold">
              3
            </div>
            <div>
              <p className="font-semibold text-foreground">Violations issued</p>
              <p className="text-sm text-muted-foreground mt-1">
                If the inspector finds violations, HPD will issue them against your landlord. 
                The landlord must correct violations by the deadlines set.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-sm font-bold">
              4
            </div>
            <div>
              <p className="font-semibold text-foreground">Court date</p>
              <p className="text-sm text-muted-foreground mt-1">
                On your court date, the judge will review the inspection results. 
                The court can order your landlord to make repairs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Links */}
      <div className="space-y-3">
        <h3 className="font-bold text-foreground text-lg">Helpful resources</h3>
        
        <a 
          href="https://hpdonline.nyc.gov/hpdonline/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary/40 transition-colors"
        >
          <div>
            <p className="font-semibold text-foreground">HPD Online</p>
            <p className="text-sm text-muted-foreground">Check violations issued on your property</p>
          </div>
          <ExternalLink className="w-5 h-5 text-muted-foreground" />
        </a>

        <a 
          href="https://opendata.cityofnewyork.us/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary/40 transition-colors"
        >
          <div>
            <p className="font-semibold text-foreground">NYC Open Data</p>
            <p className="text-sm text-muted-foreground">View historical violations (including closed ones)</p>
          </div>
          <ExternalLink className="w-5 h-5 text-muted-foreground" />
        </a>
      </div>

      {/* Return Home */}
      <div className="pt-4">
        <Button asChild variant="outline" className="w-full">
          <Link to="/">
            Return to home
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="p-4 border border-border rounded-xl">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Disclaimer:</strong> Recourse provides procedural guidance, not legal advice. 
          We do not predict outcomes or recommend legal strategies. 
          You remain the decision-maker throughout this process. 
          For legal advice specific to your situation, consult with an attorney.
        </p>
      </div>
    </div>
  );
};

export default HPStepComplete;
