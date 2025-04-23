import { RequestHandler } from "express";

import { getAllFoundSearchedPensions } from "../../services/getAllFoundSearchedPensions";
import { SearchedPensionsResultSchema } from "../../validators/searched";
import { AppError } from "../../errors";

export const getAllFoundSearchedPensionsController: RequestHandler = async (
  _req,
  res
) => {
  const result = await getAllFoundSearchedPensions();

  const { data, ...parsedResult } =
    SearchedPensionsResultSchema.safeParse(result);

  if (parsedResult.success === false) {
    // Logging service
    // console.error(fromError(parsedResult.error).toString());

    throw new AppError({
      status: 500,
      message:
        "Something went wrong while getting all searched pension pots with `status` 'FOUND'",
    });
  }

  res.json(data);
};
