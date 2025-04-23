import { RequestHandler } from "express";
import z from "zod";
import { fromError } from "zod-validation-error";

import { getPensionPotByName } from "../../services/getPensionPotByName";
import { PensionResultSchema } from "../../validators/pensions";
import { SearchedPensionResultSchema } from "../../validators/searched";
import { AppError } from "../../errors";
import { getSearchedPensionPotByName } from "../../services/getSearchedPensionPotByName";
import { PensionPot, SearchedPension } from "../../types/pensions";

const QuerySchema = z.object({
  name: z.string().trim().min(1),
});

export const getPotByNameController: RequestHandler = async (req, res) => {
  const queryParsed = QuerySchema.safeParse(req.query);

  if (queryParsed.success === false) {
    res.status(400).json({
      status: 400,
      message: fromError(queryParsed.error).toString(),
    });

    return;
  }

  const { name } = queryParsed.data;
  const validationErrorMessage = `Something went wrong while getting pot by name: ${name}`;

  // First, query pensions
  const potByNameResult = await getPensionPotByName(name);

  let validatedResult: PensionPot | SearchedPension | undefined = undefined;

  if (potByNameResult) {
    const { data, ...parsedResult } =
      PensionResultSchema.safeParse(potByNameResult);

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
    const searchedResult = await getSearchedPensionPotByName(name);

    if (searchedResult) {
      const { data, ...parsedResult } =
        SearchedPensionResultSchema.safeParse(searchedResult);

      if (parsedResult.success === false) {
        // Logging service
        console.error(fromError(parsedResult.error).toString());

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
      message: `Could not find pension pot: ${name}`,
    });

    return;
  }

  res.json(validatedResult);
};
