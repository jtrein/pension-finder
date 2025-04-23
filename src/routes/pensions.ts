import { Router } from "express";

import { getAllPensionPotsController } from "../controllers/pension/getAllPensionPotsController";
import { getAllSearchedPensionsController } from "../controllers/pension/getAllSearchedPensionsController";

const router = Router();

router.get("/pension-pots", getAllPensionPotsController);
router.get("/searched-pensions", getAllSearchedPensionsController);

export default router;
