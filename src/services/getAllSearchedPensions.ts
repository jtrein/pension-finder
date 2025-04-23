import { readPensionData } from "./readPensionData";

export async function getAllSearchedPensions() {
  const pensionData = await readPensionData();

  return pensionData.searchedPensions;
}
