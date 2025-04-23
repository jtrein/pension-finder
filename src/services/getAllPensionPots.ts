import { readPensionData } from "./readPensionData";

export async function getAllPensionPots() {
  const pensionData = await readPensionData();

  return pensionData.pensionPots;
}
