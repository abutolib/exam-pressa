import Joi from 'joi'

export const LoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})
export const RegisterSchema = Joi.object({
  username: Joi.string().min(2).max(32).pattern(new RegExp('^[a-z0-9]{3,30}$')).required(),
  password: Joi.string().min(8).max(100).required(),
  avatar:Joi.string().pattern(new RegExp('((jpe?g|png|gif|bmp))$')).required()
})
export const VideoSchema = Joi.object({ 
  title: Joi.string().max(32),
  video: Joi.string().pattern(new RegExp('((mp4|mpg|mov|avi))$')).required(),
  size:Joi.number().max(50 *1024 *1024)
})
