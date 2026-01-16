import { useState, useEffect, useCallback } from "react";

/**
 * INTAKE FORM STATE MANAGEMENT HOOK
 * 
 * UX Decision: Auto-save to localStorage with debouncing.
 * Users can return and continue where they left off.
 * Reduces data loss anxiety.
 */

export interface IntakeFormData {
  // Step 1: Case Type (pre-selected from Start page)
  caseType: "security_deposit" | "hp_action" | "civil_court" | "";
  
  // Step 2: Basic Info
  moveOutDate: Date | undefined;
  depositAmount: string;
  amountReturned: string;
  
  // Step 3: Landlord Info
  landlordName: string;
  landlordType: "individual" | "company" | "";
  propertyAddress: string;
  landlordAddress: string;
  
  // Step 4: What Happened
  receivedItemizedStatement: "yes" | "no" | "partial" | "";
  daysAfterMoveOut: string;
  deductionReasons: string[];
  
  // Step 5: Your Damages
  hasPhotos: "yes" | "no" | "";
  hasReceipts: "yes" | "no" | "";
  additionalDamages: string;
  
  // Step 6: Contact Info
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  
  // Meta
  lastSavedAt: string;
  currentStep: number;
}

const STORAGE_KEY = "recourse_intake_draft";

const defaultFormData: IntakeFormData = {
  caseType: "",
  moveOutDate: undefined,
  depositAmount: "",
  amountReturned: "",
  landlordName: "",
  landlordType: "",
  propertyAddress: "",
  landlordAddress: "",
  receivedItemizedStatement: "",
  daysAfterMoveOut: "",
  deductionReasons: [],
  hasPhotos: "",
  hasReceipts: "",
  additionalDamages: "",
  yourName: "",
  yourEmail: "",
  yourPhone: "",
  lastSavedAt: "",
  currentStep: 1,
};

export const useIntakeForm = () => {
  const [formData, setFormData] = useState<IntakeFormData>(defaultFormData);
  const [isDirty, setIsDirty] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date string back to Date object
        if (parsed.moveOutDate) {
          parsed.moveOutDate = new Date(parsed.moveOutDate);
        }
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to parse saved intake data:", e);
      }
    }
  }, []);

  // Auto-save when form data changes (debounced)
  useEffect(() => {
    if (!isDirty) return;

    const timeout = setTimeout(() => {
      const toSave = {
        ...formData,
        lastSavedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      setLastAutoSave(new Date());
      setIsDirty(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [formData, isDirty]);

  const updateField = useCallback(<K extends keyof IntakeFormData>(
    field: K,
    value: IntakeFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  const updateStep = useCallback((step: number) => {
    setFormData((prev) => ({ ...prev, currentStep: step }));
    setIsDirty(true);
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(defaultFormData);
  }, []);

  const hasSavedDraft = useCallback(() => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }, []);

  return {
    formData,
    updateField,
    updateStep,
    clearDraft,
    hasSavedDraft,
    lastAutoSave,
    isDirty,
  };
};
