import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "./readPensionData";
import { getAllPensionPots } from "./getAllPensionPots";
import { ALL_POTS_FIXTURE } from "../test/fixtures/allPots";

vi.mock("./readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getAllPensionPots", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return pension pots", async () => {
    const mockData = ALL_POTS_FIXTURE;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllPensionPots();

    expect(result).toEqual(mockData.pensionPots);
  });

  it("should handle empty pension pots", async () => {
    const mockData = { ...ALL_POTS_FIXTURE, pensionPots: [] };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllPensionPots();

    expect(result).toEqual(mockData.pensionPots);
  });
});
