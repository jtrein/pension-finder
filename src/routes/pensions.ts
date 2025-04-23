import { Router } from "express";

import { getAllPensionPotsController } from "../controllers/pension/getAllPensionPotsController";
import { getAllSearchedPensionsController } from "../controllers/pension/getAllSearchedPensionsController";
import { getAllPotsController } from "../controllers/pension/getAllPotsController";

const router = Router();

router.get("/pension-pots", getAllPensionPotsController);
router.get("/searched-pensions", getAllSearchedPensionsController);
router.get("/all-pots", getAllPotsController);

export default router;
