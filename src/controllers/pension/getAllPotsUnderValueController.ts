import { RequestHandler } from "express";
import { z } from "zod";

import { getAllPotsUnderValue } from "../../services/getAllPotsUnderValue";
import { AllPotsResultSchema } from "../../validators/allPots";
import { AppError } from "../../errors";
import { fromError } from "zod-validation-error";

const QuerySchema = z.object({
  value: z.preprocess((val) => {
    if (typeof val !== "string") {
      return val;
    }

    const num = Number(val.trim());

    return isNaN(num) ? val : num;
  }, z.number().positive()),
});

export const getAllPotsUnderValueController: RequestHandler = async (
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

  const { value } = queryParsed.data;

  const result = await getAllPotsUnderValue(value);

  const { data, ...parsedResult } = AllPotsResultSchema.safeParse(result);

  if (parsedResult.success === false) {
    // Logging service
    // console.error(fromError(parsedResult.error).toString());

    throw new AppError({
      status: 500,
      message: `Something went wrong while getting all pots under value: ${value}`,
    });
  }

  res.json(data);
};
