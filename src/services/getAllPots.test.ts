import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "./readPensionData";
import { getAllPots } from "./getAllPots";
import { ALL_POTS_FIXTURE } from "../test/fixtures/allPots";

vi.mock("./readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getAllPots", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return pension pots", async () => {
    const mockData = ALL_POTS_FIXTURE;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllPots();

    expect(result).toEqual(mockData);
  });

  it("should handle empty pension pots", async () => {
    const mockData = { pensionPots: [], searchedPensions: [] };

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    const result = await getAllPots();

    expect(result).toEqual(mockData);
  });
});
