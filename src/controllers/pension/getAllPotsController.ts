import { RequestHandler } from "express";

import { getAllPots } from "../../services/getAllPots";
import { AllPotsResultSchema } from "../../validators/allPots";
import { AppError } from "../../errors";

export const getAllPotsController: RequestHandler = async (_req, res) => {
  const result = await getAllPots();

  const { data, ...parsedResult } = AllPotsResultSchema.safeParse(result);

  if (parsedResult.success === false) {
    // Logging service
    // console.error(fromError(parsedResult.error).toString());

    throw new AppError({
      status: 500,
      message: "Something went wrong while getting all pots",
    });
  }

  res.json(data);
};
