import { useState, useEffect, useCallback } from "react";

/**
 * HP ACTION FORM STATE MANAGEMENT
 * 
 * Based on NYC CIV-LT-61 Tenant's Request for Inspection form.
 * Auto-saves to localStorage with debouncing.
 */

export interface HPCondition {
  id: string;
  location: "apartment" | "public_area";
  room: string;
  description: string;
}

export interface HPActionFormData {
  // Step 1: Eligibility
  isNYCProperty: "yes" | "no" | "";
  isTenantOrOccupant: "yes" | "no" | "";
  isCurrentCondition: "yes" | "no" | "";
  hasExistingCase: "yes" | "no" | "";
  
  // Step 2: Tenant Info
  tenantName: string;
  apartmentAddress: string;
  apartmentNumber: string;
  floor: string;
  borough: "manhattan" | "brooklyn" | "bronx" | "queens" | "staten_island" | "";
  tenantEmail: string;
  phoneHome: string;
  phoneWork: string;
  
  // Step 3: Child Under Six
  childUnderSix: "no" | "lives_here" | "visits_10hrs" | "";
  childName: string;
  childAge: string;
  
  // Step 4: Access for Inspection
  accessContact: "tenant" | "super" | "other" | "";
  accessContactName: string;
  accessContactPhone: string;
  
  // Step 5: Inspection Availability
  inspectionTimes: string[];
  
  // Step 6: Conditions
  conditions: HPCondition[];
  
  // Step 7: Review & Confirmation
  requestDate: string;
  tenantAffirmation: boolean;
  
  // Meta
  lastSavedAt: string;
  currentStep: number;
}

const STORAGE_KEY = "recourse_hp_action_draft";

const defaultFormData: HPActionFormData = {
  isNYCProperty: "",
  isTenantOrOccupant: "",
  isCurrentCondition: "",
  hasExistingCase: "",
  tenantName: "",
  apartmentAddress: "",
  apartmentNumber: "",
  floor: "",
  borough: "",
  tenantEmail: "",
  phoneHome: "",
  phoneWork: "",
  childUnderSix: "",
  childName: "",
  childAge: "",
  accessContact: "",
  accessContactName: "",
  accessContactPhone: "",
  inspectionTimes: [],
  conditions: [],
  requestDate: new Date().toISOString().split('T')[0],
  tenantAffirmation: false,
  lastSavedAt: "",
  currentStep: 1,
};

export const useHPActionForm = () => {
  const [formData, setFormData] = useState<HPActionFormData>(defaultFormData);
  const [isDirty, setIsDirty] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to parse saved HP action data:", e);
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

  const updateField = useCallback(<K extends keyof HPActionFormData>(
    field: K,
    value: HPActionFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  const updateStep = useCallback((step: number) => {
    setFormData((prev) => ({ ...prev, currentStep: step }));
    setIsDirty(true);
  }, []);

  // Condition management
  const addCondition = useCallback(() => {
    const newCondition: HPCondition = {
      id: crypto.randomUUID(),
      location: "apartment",
      room: "",
      description: "",
    };
    setFormData((prev) => ({
      ...prev,
      conditions: [...prev.conditions, newCondition],
    }));
    setIsDirty(true);
  }, []);

  const updateCondition = useCallback((id: string, updates: Partial<HPCondition>) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
    setIsDirty(true);
  }, []);

  const removeCondition = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((c) => c.id !== id),
    }));
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
    addCondition,
    updateCondition,
    removeCondition,
    clearDraft,
    hasSavedDraft,
    lastAutoSave,
    isDirty,
  };
};
