
import {AdminLoginSchema,PostCreateSchema,PostUpdateSchema} from '../utils/validation.js'

export default (req, res, next) => {
  try {
    if (req.url == '/admin' && req.method == 'POST') {
      const { error } = AdminLoginSchema.validate(req.body)
      if (error) {
        throw new Error(error)
      }
    }
    if (req.url == '/posts' && req.method == 'POST') {
      const {post_image} = req.files
      console.log(req.body.organizerId);
      const { error } = PostCreateSchema.validate({
        start_date:req.body.start_date,
        start_time:req.body.start_time,
        subcategoryId:req.body.subcategoryId,
        type:req.body.type,
        full_name:req.body.full_name,
        job:req.body.job,
        phone:req.body.phone,
        link:req.body.link,
        post_title:req.body.post_title,
        post_body:req.body.post_body,
        post_image:post_image.name,
        size:post_image.size,})
      if (error) {
        throw new Error(error)
      }
    }
    if (req.url == '/admin/posts' && req.method == 'PUT') {
      const { error } = PostUpdateSchema.validate({...req.body})
      if (error) {
        throw new Error(error)
      }
    }
    next()
  } catch (error) {
    return next(error)
  }
}