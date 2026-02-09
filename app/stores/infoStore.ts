// stores/infoStore.ts
import { create } from "zustand";
import { Info, InfoInput } from "../types";

interface InfoState {
  infoList: Info[];
  availableInfo: Info[];
  isLoading: boolean;
  error: string | null;
  lastLocation: string; // Track last used location
  fetchInfo: () => Promise<void>;
  addInfo: (input: InfoInput) => Promise<{ success: boolean; message: string }>;
  checkDuplicate: (cfoEmail: string) => boolean;
  checkDomainExists: (domain: string) => {
    exists: boolean;
    matchingInfo?: Info | null;
  };
  updateAvailableInfo: () => void;
  setLastLocation: (location: string) => void; // New method
}

export const useInfoStore = create<InfoState>((set, get) => ({
  infoList: [],
  availableInfo: [],
  isLoading: false,
  error: null,
  lastLocation: "US", // Default location

  fetchInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/info");
      if (!response.ok) {
        throw new Error("Failed to fetch info");
      }
      const data: Info[] = await response.json();

      const processedData = data.map((item) => ({
        ...item,
        createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
        updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
      }));

      set({ infoList: processedData, isLoading: false });
      get().updateAvailableInfo();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch info",
        isLoading: false,
      });
      console.error("Error fetching info:", error);
    }
  },

  setLastLocation: (location: string) => {
    set({ lastLocation: location });
  },

  updateAvailableInfo: () => {
    const { infoList } = get();
    const currentYear = 2026;

    const available = infoList.filter((info) => {
      if (info.isSent) return false;
      if (!info.createdAt) return false;
      const createdYear = info.createdAt.getFullYear();
      return createdYear >= currentYear;
    });

    set({ availableInfo: available });
  },

  checkDuplicate: (cfoEmail: string) => {
    const { infoList } = get();
    return infoList.some(
      (info) => info.cfo_email.toLowerCase() === cfoEmail.toLowerCase(),
    );
  },

  checkDomainExists: (domain: string) => {
    const { infoList } = get();
    const matchingInfo = infoList.find((info) => {
      const emailParts = info.cfo_email.split("@");
      if (emailParts.length < 2) return false;
      const emailDomain = emailParts[1].toLowerCase();
      return emailDomain === domain.toLowerCase();
    });

    return {
      exists: !!matchingInfo,
      matchingInfo: matchingInfo || null,
    };
  },

  addInfo: async (input: InfoInput) => {
    const { checkDuplicate, checkDomainExists, setLastLocation } = get();

    // Check for duplicate CFO email
    if (checkDuplicate(input.cfoEmail)) {
      return { success: false, message: "Duplicate CFO email found" };
    }

    // Check if domain exists in any CFO email
    const domainCheck = checkDomainExists(input.domain);
    if (domainCheck.exists) {
      return {
        success: false,
        message: `Domain "${input.domain}" already exists in the system`,
      };
    }

    try {
      const response = await fetch("/api/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cfo_email: input.cfoEmail,
          ceo_name: input.ceoName,
          ceo_email: input.ceoEmail,
          domain: input.domain,
          location: input.location,
        }),
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        if (response.status === 401) {
          return {
            success: false,
            message: "Authentication required. Please log in again.",
          };
        }
        throw new Error("Failed to submit info");
      }

      const newInfo: Info = await response.json();

      // Store the location for next submission
      setLastLocation(input.location);

      // Convert string dates to Date objects
      const processedInfo = {
        ...newInfo,
        createdAt: newInfo.createdAt ? new Date(newInfo.createdAt) : undefined,
        updatedAt: newInfo.updatedAt ? new Date(newInfo.updatedAt) : undefined,
      };

      // Update the store
      set((state) => {
        const newList = [...state.infoList, processedInfo];
        return { infoList: newList };
      });

      // Update available info after adding
      get().updateAvailableInfo();

      return { success: true, message: "Info added successfully" };
    } catch (error) {
      console.error("Error adding info:", error);
      return { success: false, message: "Error adding info" };
    }
  },
}));
