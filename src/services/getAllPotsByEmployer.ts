import { readPensionData } from "./readPensionData";

export async function getAllPotsByEmployer(employer: string | null) {
  const pensionData = await readPensionData();

  const employerNormalised = employer?.trim().toLowerCase() || null;

  const filteredPensions = Object.entries(pensionData).map(
    ([key, pensions]) => {
      const byEmployer = pensions.filter(
        (p) => (p.employer?.trim().toLowerCase() || null) === employerNormalised
      );

      return [key, byEmployer];
    }
  );

  return Object.fromEntries(filteredPensions);
}
