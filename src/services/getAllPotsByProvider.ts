import { readPensionData } from "./readPensionData";

export async function getAllPotsByProvider(provider: string | null) {
  const pensionData = await readPensionData();

  const providerNormalised = provider?.trim().toLowerCase() || null;

  const filteredPensions = Object.entries(pensionData).map(
    ([key, pensions]) => {
      const byProvider = pensions.filter(
        ({ pensionProvider: { value } }) =>
          (value?.trim().toLowerCase() || null) === providerNormalised
      );

      return [key, byProvider];
    }
  );

  return Object.fromEntries(filteredPensions);
}
