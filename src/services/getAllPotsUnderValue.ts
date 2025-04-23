import { readPensionData } from "./readPensionData";

export async function getAllPotsUnderValue(amount: number) {
  const pensionData = await readPensionData();

  const filteredPensions = Object.entries(pensionData).map(
    ([key, pensions]) => {
      const amountsUnder = pensions.filter((p) => p.amount < amount);

      return [key, amountsUnder];
    }
  );

  return Object.fromEntries(filteredPensions);
}
