import z from "zod";

export const PensionsResultSchema = z.array(
  z.object({
    id: z.string().uuid(),
    potName: z.string(),
    annualInterestRate: z.number().nullable(),
    defaultAnnualInterestRate: z.number(),
    pensionProvider: z.object({
      name: z.string().nullable(),
      value: z.string().nullable(),
    }),
    amount: z.number(),
    employer: z.string().nullable(),
    lastUpdatedAt: z.string().datetime(),
    monthlyPayment: z.number(),
    isWorkplacePension: z.boolean(),
  })
);
