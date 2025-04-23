import type { SearchedPension } from "../types/pensions";
import { readPensionData } from "./readPensionData";

export async function getSearchedPensionPotById(
  id: string
): Promise<SearchedPension | null> {
  const idNormalised = id.trim().toLowerCase();

  if (!idNormalised) {
    return null;
  }

  const pensionData = await readPensionData();

  const searchedPot = pensionData.searchedPensions.find(
    (pot) => pot.id.trim().toLowerCase() === idNormalised
  );

  return searchedPot || null;
}
