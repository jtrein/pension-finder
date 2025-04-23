import type { SearchedPension } from "../types/pensions";
import { readPensionData } from "./readPensionData";

export async function getSearchedPensionPotByName(
  name: string
): Promise<SearchedPension | null> {
  const nameNormalised = name.trim().toLowerCase();

  if (!nameNormalised) {
    return null;
  }

  const pensionData = await readPensionData();

  const searchedPot = pensionData.searchedPensions.find(
    (pot) => pot.potName.trim().toLowerCase() === nameNormalised
  );

  return searchedPot || null;
}
