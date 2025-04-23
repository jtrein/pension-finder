type PensionProvider = {
  name: string | null;
  value: string | null;
};

export type PensionPot = {
  id: string;
  potName: string;
  annualInterestRate: number | null;
  defaultAnnualInterestRate: number;
  pensionProvider: PensionProvider;
  amount: number;
  employer: string | null;
  lastUpdatedAt: string;
  monthlyPayment: number;
  isWorkplacePension: boolean;
};

export type SearchedPension = {
  id: string;
  potName: string;
  policyNumber: string | null;
  annualFee: number | null;
  status: "TO_HUNT" | "FOUND";
  previousName: string | null;
  previousAddress: string;
  annualInterestRate: number;
  defaultAnnualInterestRate: number;
  pensionProvider: PensionProvider;
  amount: number;
  employer: string;
  foundOn: string;
  lastUpdatedAt: string;
  monthlyPayment: number;
  isDraft: boolean;
};

export type PensionData = {
  pensionPots: PensionPot[];
  searchedPensions: SearchedPension[];
};
