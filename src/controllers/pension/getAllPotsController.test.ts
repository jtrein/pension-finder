import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "../../services/readPensionData";
import { getAllPotsController } from "./getAllPotsController";
import { PENSION_POTS_FIXTURE } from "../../test/fixtures/pensions";
import { ALL_POTS_FIXTURE } from "../../test/fixtures/allPots";

vi.mock("../../services/readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("getAllPotsController", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return all pension pots", async () => {
    const mockData = ALL_POTS_FIXTURE;

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    await getAllPotsController(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith(mockData);

    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  it("should return empty pots", async () => {
    const mockData = { pensionPots: [], searchedPensions: [] };

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    await getAllPotsController(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith(mockData);

    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  it("should throw when result schema is not valid", async () => {
    const mockData = {
      ...ALL_POTS_FIXTURE,
      searchedPensions: [
        { ...PENSION_POTS_FIXTURE[0], id: null },
        PENSION_POTS_FIXTURE[1],
      ],
    } as any;

    const req = {} as any;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    vi.mocked(readPensionData).mockResolvedValue(mockData);

    await expect(getAllPotsController(req, res, () => {})).rejects.toThrow(
      "Something went wrong while getting all pots"
    );

    expect(res.json).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalledWith(500);
  });
});
