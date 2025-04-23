import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "./readPensionData";
import { getPensionPotByName } from "./getPensionPotByName";
import { PENSION_POTS_FIXTURE } from "../test/fixtures/pensions";
import { SEARCHED_PENSIONS_FIXTURE } from "../test/fixtures/searched";

vi.mock("./readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getPensionPotByName", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return pension pot", async () => {
    const mockData = {
      pensionPots: PENSION_POTS_FIXTURE,
      searchedPensions: SEARCHED_PENSIONS_FIXTURE,
    };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getPensionPotByName("IBM");

    expect(result).toEqual(PENSION_POTS_FIXTURE[1]);
  });

  it("should handle no result", async () => {
    const mockData = { pensionPots: [], searchedPensions: [] };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getPensionPotByName("IBM");

    expect(result).toEqual(null);
  });

  it("should handle empty name", async () => {
    const mockData = { pensionPots: [], searchedPensions: [] };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getPensionPotByName("  ");

    expect(result).toEqual(null);
  });
});
