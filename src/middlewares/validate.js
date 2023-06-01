
import { LoginSchema, RegisterSchema, ImageSchema } from "../utils/validation.js"
import {AdminLoginSchema,PosterCreateSchema} from '../utils/validationSchemas.js'

export default (req, res, next) => {
  try {
    if (req.url == '/admin' && req.method == 'POST') {
      const { error } = AdminLoginSchema.validate(req.body)
      if (error) {
        throw new Error(error)
      }
    }
    if (req.url == '/register' && req.method == 'POST') {
      const { error } = RegisterSchema.validate({avatar:req.files.avatar.name,...req.body})
      if (error) {
        throw new Error(error)
      }
    }
    // if (req.url == '/posts' && req.method == 'POST') {
    //   const {post_image} = req.files
    //   console.log(post_image.name);
    //   console.log('salom');
    //   const { error } = ImageSchema.validate({post_image:post_image.name,size:post_image.size})
    //   if (error) {
    //     throw new Error(error)
    //   }
    // }
    if (req.url == '/posts' && req.method == 'POST') {
      const {post_image} = req.files
      console.log(req.body.organizerId);
      const { error } = PosterCreateSchema.validate({
        start_date:req.body.start_date,
        start_time:req.body.start_time,
        //subcategoryId:req.body.subcategoryId,
        type:req.body.type,
        link:req.body.link,
        post_title:req.body.post_title,
        post_body:req.body.post_body,
        organizerId:req.body.organizerId,
        post_image:post_image.name,
        size:post_image.size})
      if (error) {
        throw new Error(error)
      }
    }
    if (req.url == '/admin/posts' && req.method == 'POST') {
      const {title} = req.body
      const {video} = req.files
      const { error } = VideoSchema.validate({title:title,video:video.name,size:video.size})
      if (error) {
        throw new Error(error)
      }
    }
    next()
  } catch (error) {
    return next(error)
  }
}