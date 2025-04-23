import { RequestHandler } from "express";
import { z } from "zod";

import { getAllPotsByEmployer } from "../../services/getAllPotsByEmployer";
import { AllPotsResultSchema } from "../../validators/allPots";
import { AppError } from "../../errors";
import { fromError } from "zod-validation-error";

const QuerySchema = z.object({
  name: z
    .string()
    .trim()
    .transform((v) => v || null),
});

export const getAllPotsByEmployerController: RequestHandler = async (
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

  const result = await getAllPotsByEmployer(name);

  const { data, ...parsedResult } = AllPotsResultSchema.safeParse(result);

  if (parsedResult.success === false) {
    // Logging service
    // console.error(fromError(parsedResult.error).toString());

    throw new AppError({
      status: 500,
      message: `Something went wrong while getting all pension pots by employer: ${name}`,
    });
  }

  res.json(data);
};
