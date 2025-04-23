import { RequestHandler } from "express";

import { getAllPensionPots } from "../../services/getAllPensionPots";

export const getAllPensionPotsController: RequestHandler = async (req, res) => {
  const result = await getAllPensionPots();

  res.json(result);
};
