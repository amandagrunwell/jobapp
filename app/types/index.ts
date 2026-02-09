// types/index.ts
export interface InfoInput {
  cfoEmail: string;
  ceoName: string;
  ceoEmail: string;
  domain: string;
  location: "Au" | "Ca" | "US"; // Add location
}

export interface Info {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  ceo_name: string;
  ceo_email?: string | null;
  cfo_email: string;
  location: string;
  isSent: boolean;
  isResent: boolean;
  isOpen: boolean;
  isSanitized: boolean;
  organizationName?: string | null;
  organizationId?: string | null;
  organizationWebsite?: string | null;
  user?: string | null;
}
