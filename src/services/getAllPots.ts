import { readPensionData } from "./readPensionData";

export async function getAllPots() {
  const pensionData = await readPensionData();

  return pensionData;
}
