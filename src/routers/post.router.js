import {Router} from 'express'
import postController from '../controllers/post.controller.js'
import validate from '../middlewares/validate.js'
import checkToken from '../middlewares/checkToken.js'
const router = Router()

router.get('/posts',postController.GET)
router.get('/posts/:postId',postController.GET_BY_ID)
router.post('/posts',validate,postController.POST)
//router.post('/posts',postController.POST)

export default router