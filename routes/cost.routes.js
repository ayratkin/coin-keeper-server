import {Router} from "express";
import costController from "../controllers/cost.controller.js";
import balanceController from "../controllers/balance.controller.js";

const router = new Router();

router.put('/cost', costController.addNewCost)
router.get('/costs', costController.getAllCosts)
router.get('/costs/categories', costController.getCostCategories)
router.put('/categories/create', costController.createCostCategory)
router.delete('/categories/delete', costController.deleteCostCategory)

export default router;

