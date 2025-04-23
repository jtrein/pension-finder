import z from "zod";

export const PensionResultSchema = z.object({
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
});

export const PensionWithForecastResultSchema = PensionResultSchema.extend({
  forecastedBalance: z.number(),
});

export const PensionsResultSchema = z.array(PensionResultSchema);

export const PensionsWithForecastResultSchema = z.array(
  PensionWithForecastResultSchema
);
