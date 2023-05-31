
import { LoginSchema, RegisterSchema, ImageSchema } from "../utils/validation.js"

export default (req, res, next) => {
  try {
    if (req.url == '/login' && req.method == 'POST') {
      const { error } = LoginSchema.validate(req.body)
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
    if (req.url == '/admin/videos' && req.method == 'POST') {
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