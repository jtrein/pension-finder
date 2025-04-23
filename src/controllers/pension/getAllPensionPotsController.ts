import { RequestHandler } from "express";

import { getAllPensionPots } from "../../services/getAllPensionPots";
import { PensionsResultSchema } from "../../validators/pensions";
import { AppError } from "../../errors";

export const getAllPensionPotsController: RequestHandler = async (
  _req,
  res
) => {
  const result = await getAllPensionPots();

  const { data, ...parsedResult } = PensionsResultSchema.safeParse(result);

  if (parsedResult.success === false) {
    // Logging service
    // console.error(fromError(parsedResult.error).toString());

    throw new AppError({
      status: 500,
      message: "Something went wrong while getting all pension pots",
    });
  }

  res.json(data);
};
