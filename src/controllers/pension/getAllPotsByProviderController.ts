import { RequestHandler } from "express";
import { z } from "zod";
import { fromError } from "zod-validation-error";

import { getAllPotsByProvider } from "../../services/getAllPotsByProvider";
import { AllPotsResultSchema } from "../../validators/allPots";
import { AppError } from "../../errors";

const QuerySchema = z.object({
  name: z
    .string()
    .trim()
    .transform((v) => v || null),
});

export const getAllPotsByProviderController: RequestHandler = async (
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

  const { name } = queryParsed.data;

  const result = await getAllPotsByProvider(name);

  const { data, ...parsedResult } = AllPotsResultSchema.safeParse(result);

  if (parsedResult.success === false) {
    // Logging service
    // console.error(fromError(parsedResult.error).toString());

    throw new AppError({
      status: 500,
      message: `Something went wrong while getting all pension pots by provider: ${name}`,
    });
  }

  res.json(data);
};
