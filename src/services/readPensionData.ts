import mockData from "../data/mockPensionData.json";
import { PensionData } from "../types/pensions";

export async function readPensionData(): Promise<PensionData> {
  return mockData;
}
