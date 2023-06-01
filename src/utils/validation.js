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
export const PostSchema = Joi.object({
  //start_date, start_time, categoryId, subcategoryId, type, link,full_name,number,job,post_title,post_body,
  start_date:Joi.date().max('now').required(),
  start_time:Joi.string().min(2).max(32).pattern(new RegExp('^[a-z0-9]{3,30}$')).required(),
  categoryId:Joi.number().min(1),
  //subcategoryId:Joi.number().min(1),
  password: Joi.string().min(8).max(100).required(),
  avatar:Joi.string().pattern(new RegExp('((jpe?g|png|gif|bmp))$')).required()
})
export const ImageSchema = Joi.object({ 
  post_image: Joi.string().pattern(new RegExp('((jpe?g|png|gif|bmp))$')).required(),
  size:Joi.number().max(2*1024*1024)
})
