import {Router} from "express";
import costController from "../controllers/cost.controller.js";

const router = new Router();

router.get('/costs', costController.getAllCosts)
router.get('/costs/categories', costController.getCostCategories)

export default router;

