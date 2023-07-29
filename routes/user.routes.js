import { Router } from "express";
import userController from '../controller/user.controller.js'

const router = new Router();

router.post('/user', userController.createUser )
router.get('/users', userController.getUsers )
router.get('/user:id', userController.getSingleUser )
router.put('/user', userController.updateUser )
router.delete('/user:id', userController.deleteUser )

// module.exports = router;
export default router;
