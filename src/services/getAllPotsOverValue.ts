import { readPensionData } from "./readPensionData";

export async function getAllPotsOverValue(amount: number) {
  const pensionData = await readPensionData();

  const filteredPensions = Object.entries(pensionData).map(
    ([key, pensions]) => {
      const amountsOver = pensions.filter((p) => p.amount > amount);

      return [key, amountsOver];
    }
  );

  return Object.fromEntries(filteredPensions);
}
