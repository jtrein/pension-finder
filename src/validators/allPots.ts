import z from "zod";

import { PensionsResultSchema } from "./pensions";
import { SearchedPensionsResultSchema } from "./searched";

export const AllPotsResultSchema = z.object({
  pensionPots: PensionsResultSchema,
  searchedPensions: SearchedPensionsResultSchema,
});
