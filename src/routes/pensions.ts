import { Router } from "express";

import { getAllPensionPotsController } from "../controllers/pension/getAllPensionPotsController";
import { getAllSearchedPensionsController } from "../controllers/pension/getAllSearchedPensionsController";
import { getAllPotsController } from "../controllers/pension/getAllPotsController";
import { getPotByNameController } from "../controllers/pension/getPotByNameController";
import { getPotByIdController } from "../controllers/pension/getPotByIdController";
import { getAllPotsOverValueController } from "../controllers/pension/getAllPotsOverValueController";
import { getAllPotsUnderValueController } from "../controllers/pension/getAllPotsUnderValueController";
import { getAllFoundSearchedPensionsController } from "../controllers/pension/getAllFoundSearchedPensionsController";
import { getAllPotsByEmployerController } from "../controllers/pension/getAllPotsByEmployerController";
import { getAllPotsByProviderController } from "../controllers/pension/getAllPotsByProviderController";
import { getAllPotsForecastedBalanceController } from "../controllers/pension/getAllPotsForecastedBalanceController";

const router = Router();

router.get("/pension-pots", getAllPensionPotsController);
router.get("/searched-pensions", getAllSearchedPensionsController);
router.get("/all-pots", getAllPotsController);
router.get("/pots/search", getPotByNameController);
router.get("/pots/:id", getPotByIdController);
router.get("/pots/search/over", getAllPotsOverValueController);
router.get("/pots/search/under", getAllPotsUnderValueController);
router.get("/searched-pensions/found", getAllFoundSearchedPensionsController);
router.get("/pots/search/employer", getAllPotsByEmployerController);
router.get("/pots/search/provider", getAllPotsByProviderController);
router.get("/pension-pots/forecast", getAllPotsForecastedBalanceController);

export default router;
