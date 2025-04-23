import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "./readPensionData";
import { getAllPensionPots } from "./getAllPensionPots";
import { PENSION_POTS_FIXTURE } from "../test/fixtures/pensions";

vi.mock("./readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getAllPensionPots", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return pension pots", async () => {
    const mockData = {
      pensionPots: PENSION_POTS_FIXTURE,
    };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllPensionPots();

    expect(result).toEqual(mockData.pensionPots);
  });

  it("should handle empty pension pots", async () => {
    const mockData = { pensionPots: [] };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllPensionPots();

    expect(result).toEqual(mockData.pensionPots);
  });
});
