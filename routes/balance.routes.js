import { Router } from "express";
import userController from '../controllers/balance.controller.js'

const router = new Router();

router.get('/balance', userController.getBalance )
// router.post('/user', userController.createUser )
// router.get('/user:id', userController.getSingleUser )
// router.put('/user', userController.updateUser )
// router.delete('/user:id', userController.deleteUser )

export default router;

