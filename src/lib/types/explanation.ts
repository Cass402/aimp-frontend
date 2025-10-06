export type Persona = "operations" | "maintenance" | "markets";

export interface ExplanationInput {
  key: string;
  value: string | number;
  source: string;
  freshnessSec: number;
}

export interface Explanation {
  id: string;
  persona: Persona;
  title: string;
  summary: string;
  reasoning: string[];
  constraints: string[];
  inputs: ExplanationInput[];
  zkProofHash?: string;
  nextActions?: string[];
  timestamp: string;
}
