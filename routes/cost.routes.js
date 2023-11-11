import {Router} from "express";
import costController from "../controllers/cost.controller.js";

const router = new Router();

router.get('/cost', costController.getAllCosts)

export default router;

