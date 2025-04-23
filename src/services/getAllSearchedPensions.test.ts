import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "./readPensionData";
import { getAllSearchedPensions } from "./getAllSearchedPensions";
import { ALL_POTS_FIXTURE } from "../test/fixtures/allPots";

vi.mock("./readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getAllSearchedPensions", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return pension pots", async () => {
    const mockData = ALL_POTS_FIXTURE;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllSearchedPensions();

    expect(result).toEqual(mockData.searchedPensions);
  });

  it("should handle empty pension pots", async () => {
    const mockData = { ...ALL_POTS_FIXTURE, searchedPensions: [] };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllSearchedPensions();

    expect(result).toEqual(mockData.searchedPensions);
  });
});
