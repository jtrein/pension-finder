import { describe, it, expect, vi, beforeEach } from "vitest";

import { readPensionData } from "../../services/readPensionData";
import { getAllPensionPotsController } from "./getAllPensionPotsController";
import { PENSION_POTS_FIXTURE } from "../../test/fixtures/pensions";

vi.mock("../../services/readPensionData", () => ({
  readPensionData: vi.fn(),
}));

describe("User Handlers", () => {
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
});
