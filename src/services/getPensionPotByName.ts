import type { PensionPot } from "../types/pensions";
import { readPensionData } from "./readPensionData";

export async function getPensionPotByName(
  name: string
): Promise<PensionPot | null> {
  const nameNormalised = name.trim().toLowerCase();

  if (!nameNormalised) {
    return null;
  }

  const pensionData = await readPensionData();

  const pensionPot = pensionData.pensionPots.find(
    (pot) => pot.potName.trim().toLowerCase() === nameNormalised
  );

  return pensionPot || null;
}
