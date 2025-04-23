import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "./readPensionData";
import { getSearchedPensionPotByName } from "./getSearchedPensionPotByName";
import { PENSION_POTS_FIXTURE } from "../test/fixtures/pensions";
import { SEARCHED_PENSIONS_FIXTURE } from "../test/fixtures/searched";

vi.mock("./readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getSearchedPensionPotByName", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return pension pot", async () => {
    const mockData = {
      pensionPots: PENSION_POTS_FIXTURE,
      searchedPensions: SEARCHED_PENSIONS_FIXTURE,
    };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getSearchedPensionPotByName("Pension");

    expect(result).toEqual(SEARCHED_PENSIONS_FIXTURE[1]);
  });

  it("should handle no result", async () => {
    const mockData = { pensionPots: [], searchedPensions: [] };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getSearchedPensionPotByName("Pension");

    expect(result).toEqual(null);
  });

  it("should handle empty name", async () => {
    const mockData = { pensionPots: [], searchedPensions: [] };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getSearchedPensionPotByName("  ");

    expect(result).toEqual(null);
  });
});
