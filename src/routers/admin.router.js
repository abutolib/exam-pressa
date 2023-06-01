import {Router} from 'express'
import adminController from '../controllers/admin.controller.js'
import validate from '../middlewares/validate.js'
import checkToken from '../middlewares/checkToken.js'
const router = Router()

router.post('/admin',validate,adminController.LOGIN)
router.put('/admin/posts',validate,checkToken,adminController.PUT)

export default router