import { RequestHandler } from "express";

import { getAllSearchedPensions } from "../../services/getAllSearchedPensions";
import { SearchedPensionsResultSchema } from "../../validators/searched";
import { AppError } from "../../errors";

export const getAllSearchedPensionsController: RequestHandler = async (
  _req,
  res
) => {
  const result = await getAllSearchedPensions();

  const { data, ...parsedResult } =
    SearchedPensionsResultSchema.safeParse(result);

  if (parsedResult.success === false) {
    // Logging service
    // console.error(fromError(parsedResult.error).toString());

    throw new AppError({
      status: 500,
      message: "Something went wrong while getting all searched pension pots",
    });
  }

  res.json(data);
};
