import { Router } from "express";

import { getAllPensionPotsController } from "../controllers/pension/getAllPensionPotsController";
import { getAllSearchedPensionsController } from "../controllers/pension/getAllSearchedPensionsController";
import { getAllPotsController } from "../controllers/pension/getAllPotsController";
import { getPotByNameController } from "../controllers/pension/getPotByNameController";
import { getPotByIdController } from "../controllers/pension/getPotByIdController";

const router = Router();

router.get("/pension-pots", getAllPensionPotsController);
router.get("/searched-pensions", getAllSearchedPensionsController);
router.get("/all-pots", getAllPotsController);
router.get("/pots/search", getPotByNameController);
router.get("/pots/:id", getPotByIdController);

export default router;
