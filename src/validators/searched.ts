import z from "zod";

export const SearchedPensionResultSchema = z.object({
  id: z.string().uuid(),
  potName: z.string(),
  policyNumber: z.string().nullable(),
  annualFee: z.number().nullable(),
  status: z.enum(["TO_HUNT", "FOUND"]),
  previousName: z.string().nullable(),
  previousAddress: z.string(),
  annualInterestRate: z.number(),
  defaultAnnualInterestRate: z.number(),
  pensionProvider: z.object({
    name: z.string().nullable(),
    value: z.string().nullable(),
  }),
  amount: z.number(),
  employer: z.string(),
  foundOn: z.string().datetime(),
  lastUpdatedAt: z.string().datetime(),
  monthlyPayment: z.number(),
  isDraft: z.boolean(),
});

export const SearchedPensionsResultSchema = z.array(
  SearchedPensionResultSchema
);
