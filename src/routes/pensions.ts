import { Router } from "express";

import { getAllPensionPotsController } from "../controllers/pension/getAllPensionPotsController";
import { getAllSearchedPensionsController } from "../controllers/pension/getAllSearchedPensionsController";
import { getAllPotsController } from "../controllers/pension/getAllPotsController";
import { getPotByNameController } from "../controllers/pension/getPotByNameController";

const router = Router();

router.get("/pension-pots", getAllPensionPotsController);
router.get("/searched-pensions", getAllSearchedPensionsController);
router.get("/all-pots", getAllPotsController);
router.get("/pots/search", getPotByNameController);

export default router;
