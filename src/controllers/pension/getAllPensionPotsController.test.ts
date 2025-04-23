import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "../../services/readPensionData";
import { getAllPensionPotsController } from "./getAllPensionPotsController";
import { PENSION_POTS_FIXTURE } from "../../test/fixtures/pensions";

vi.mock("../../services/readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getAllPensionPotsController", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return all pension pots", async () => {
    const mockData = { pensionPots: PENSION_POTS_FIXTURE };

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    await getAllPensionPotsController(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith(mockData.pensionPots);

    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  it("should return empty pension pots", async () => {
    const mockData = { pensionPots: [] };

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    await getAllPensionPotsController(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith(mockData.pensionPots);

    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  it("should throw when result schema is not valid", async () => {
    const mockData = {
      searchedPensions: [
        { ...PENSION_POTS_FIXTURE[0], id: null },
        PENSION_POTS_FIXTURE[1],
      ],
    };

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    await expect(
      getAllPensionPotsController(req, res, () => {})
    ).rejects.toThrow("Something went wrong while getting all pension pots");

    expect(res.json).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalledWith(500);
  });
});
