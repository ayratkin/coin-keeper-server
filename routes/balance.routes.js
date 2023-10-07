import {Router} from "express";
import balanceController from '../controllers/balance.controller.js'

const router = new Router();

router.get('/balance', balanceController.getBalance)
router.put('/balance', balanceController.changeBalance)
// router.get('/user:id', userController.getSingleUser )
// router.put('/user', userController.updateUser )
// router.delete('/user:id', userController.deleteUser )

export default router;

