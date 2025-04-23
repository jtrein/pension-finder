import { RequestHandler } from "express";
import { z } from "zod";
import { fromError } from "zod-validation-error";

import { getAllPotsForecastedBalance } from "../../services/getAllPotsForecastedBalance";
import { PensionsWithForecastResultSchema } from "../../validators/pensions";
import { AppError } from "../../errors";

const QuerySchema = z.object({
  years: z.preprocess((val) => {
    if (typeof val !== "string") {
      return val;
    }

    const num = Number(val.trim());

    return isNaN(num) ? val : num;
  }, z.number().positive()),
});

export const getAllPotsForecastedBalanceController: RequestHandler = async (
  req,
  res
) => {
  const queryParsed = QuerySchema.safeParse(req.query);

  if (queryParsed.success === false) {
    res.status(400).json({
      status: 400,
      message: fromError(queryParsed.error).toString(),
    });

    return;
  }

  const { years } = queryParsed.data;

  const result = await getAllPotsForecastedBalance(years);

  const { data, ...parsedResult } =
    PensionsWithForecastResultSchema.safeParse(result);

  if (parsedResult.success === false) {
    // Logging service
    // console.error(fromError(parsedResult.error).toString());

    throw new AppError({
      status: 500,
      message: `Something went wrong while getting all pots with a forecasted balance after ${years} years`,
    });
  }

  res.json(data);
};
