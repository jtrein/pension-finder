import { readPensionData } from "./readPensionData";

export async function getAllFoundSearchedPensions() {
  const pensionData = await readPensionData();

  return pensionData.searchedPensions.filter((p) => p.status === "FOUND");
}
