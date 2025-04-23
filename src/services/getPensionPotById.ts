import type { PensionPot } from "../types/pensions";
import { readPensionData } from "./readPensionData";

export async function getPensionPotById(
  id: string
): Promise<PensionPot | null> {
  const idNormalised = id.trim().toLowerCase();

  if (!idNormalised) {
    return null;
  }

  const pensionData = await readPensionData();

  const pensionPot = pensionData.pensionPots.find(
    (pot) => pot.id.trim().toLowerCase() === idNormalised
  );

  return pensionPot || null;
}
