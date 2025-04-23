import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "../../services/readPensionData";
import { getAllSearchedPensionsController } from "./getAllSearchedPensionsController";
import { SEARCHED_PENSIONS_FIXTURE } from "../../test/fixtures/searched";

vi.mock("../../services/readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getAllSearchedPensionsController", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return all searched pension pots", async () => {
    const mockData = { searchedPensions: SEARCHED_PENSIONS_FIXTURE };

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    await getAllSearchedPensionsController(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith(mockData.searchedPensions);

    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  it("should return empty searched pension pots", async () => {
    const mockData = { searchedPensions: [] };

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    await getAllSearchedPensionsController(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith(mockData.searchedPensions);

    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  it("should throw when result schema is not valid", async () => {
    const mockData = {
      searchedPensions: [
        { ...SEARCHED_PENSIONS_FIXTURE[0], id: null },
        SEARCHED_PENSIONS_FIXTURE[1],
      ],
    };

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    expect(
      async () => await getAllSearchedPensionsController(req, res, () => {})
    ).rejects.toThrow(
      "Something went wrong while getting all searched pension pots"
    );

    expect(res.json).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalledWith(500);
  });
});
