import {Router} from 'express'
import adminController from '../controllers/admin.controller.js'
import validate from '../middlewares/validate.js'
import checkToken from '../middlewares/checkToken.js'
const router = Router()

router.post('/admin',adminController.LOGIN)
router.put('/admin/posts',checkToken,adminController.PUT)

export default router