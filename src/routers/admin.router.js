import {Router} from 'express'
import userController from '../controllers/user.controller.js'
import validate from '../middlewares/validate.js'
import checkToken from '../middlewares/checkToken.js'
const router = Router()

router.get('/users',checkToken,userController.GET)
router.post('/login',validate,userController.LOGIN)
router.post('/register',validate,userController.REGISTER)

export default router