import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "./readPensionData";
import { getAllSearchedPensions } from "./getAllSearchedPensions";
import { SEARCHED_PENSIONS_FIXTURE } from "../test/fixtures/searched";

vi.mock("./readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getAllSearchedPensions", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return pension pots", async () => {
    const mockData = {
      searchedPensions: SEARCHED_PENSIONS_FIXTURE,
    };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllSearchedPensions();

    expect(result).toEqual(mockData.searchedPensions);
  });

  it("should handle empty pension pots", async () => {
    const mockData = { searchedPensions: [] };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllSearchedPensions();

    expect(result).toEqual(mockData.searchedPensions);
  });
});
