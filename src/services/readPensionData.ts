import { promises as fs } from "fs";
import path from "path";

export async function readPensionData() {
  const filePath = path.resolve(__dirname, "../data/mockPensionData.json");
  const data = await fs.readFile(filePath, "utf-8");

  return JSON.parse(data);
}
