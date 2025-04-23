import { RequestHandler } from "express";
import z from "zod";
import { fromError } from "zod-validation-error";

import { getPensionPotById } from "../../services/getPensionPotById";
import { PensionResultSchema } from "../../validators/pensions";
import { SearchedPensionResultSchema } from "../../validators/searched";
import { AppError } from "../../errors";
import { getSearchedPensionPotById } from "../../services/getSearchedPensionPotById";
import { PensionPot, SearchedPension } from "../../types/pensions";

const ParamsSchema = z.object({
  id: z.string().trim().uuid(),
});

export const getPotByIdController: RequestHandler = async (req, res) => {
  const paramsParsed = ParamsSchema.safeParse(req.params);

  if (paramsParsed.success === false) {
    res.status(400).json({
      status: 400,
      message: fromError(paramsParsed.error).toString(),
    });

    return;
  }

  const { id } = paramsParsed.data;
  const validationErrorMessage = `Something went wrong while getting pot by id: ${id}`;

  // First, query pensions
  const potByIdResult = await getPensionPotById(id);

  let validatedResult: PensionPot | SearchedPension | undefined = undefined;

  if (potByIdResult) {
    const { data, ...parsedResult } =
      PensionResultSchema.safeParse(potByIdResult);

    if (parsedResult.success === false) {
      // Logging service
      // console.error(fromError(parsedResult.error).toString());

      throw new AppError({
        status: 500,
        message: validationErrorMessage,
      });
    }

    validatedResult = data;
  }

  if (!validatedResult) {
    // If no result, query searched pensions
    const searchedResult = await getSearchedPensionPotById(id);

    if (searchedResult) {
      const { data, ...parsedResult } =
        SearchedPensionResultSchema.safeParse(searchedResult);

      if (parsedResult.success === false) {
        // Logging service
        // console.error(fromError(parsedResult.error).toString());

        throw new AppError({
          status: 500,
          message: validationErrorMessage,
        });
      }

      validatedResult = data;
    }
  }

  if (!validatedResult) {
    res.status(404).json({
      status: 404,
      message: `Could not find pension pot: ${id}`,
    });

    return;
  }

  res.json(validatedResult);
};
