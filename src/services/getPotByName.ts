import type { PensionPot, SearchedPension } from "../types/pensions";
import { readPensionData } from "./readPensionData";

export async function getPotByName(
  name: string
): Promise<PensionPot | SearchedPension | null> {
  const nameNormalised = name.trim().toLowerCase();

  if (!nameNormalised) {
    return null;
  }

  const pensionData = await readPensionData();

  const pensionPot = pensionData.pensionPots.find(
    (pot) => pot.potName.trim().toLowerCase() === nameNormalised
  );

  // Exit early if found
  if (pensionPot) {
    return pensionPot;
  }

  // Else, keep searching
  const searchedPot = pensionData.searchedPensions.find(
    (pot) => pot.potName.trim().toLowerCase() === nameNormalised
  );

  return searchedPot || null;
}
