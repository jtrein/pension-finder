import { Router } from "express";

import { getAllPensionPotsController } from "../controllers/pension/getAllPensionPotsController";

const router = Router();

router.get("/pension-pots", getAllPensionPotsController);

export default router;
