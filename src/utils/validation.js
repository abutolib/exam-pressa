import Joi from "joi";


export const AdminLoginSchema = Joi.object({
  adminLogin: Joi.string().required().min(8).max(32).regex(/([a-z])\w+/),
  password: Joi.string().required().min(8).max(24),
});

export const PostCreateSchema = Joi.object({
  start_date: Joi.string()
    .required().regex(/^(?:\d{4})-(?:\d{2})-(?:\d{2})$/), 
  start_time:Joi.string().required().regex(/(?:\d{2}):(?:\d{2})$/),
  subcategoryId: Joi.number().required(),
  type: Joi.string().required().min(6).max(7), 
  link: Joi.string().required().min(8).max(64),
  post_title: Joi.string().required().min(15).max(64),
  post_body: Joi.string().required().min(32).max(260),
  //organizerId: Joi.number().required(),
  full_name:Joi.string().required().min(15).max(64),
  job:Joi.string().required().min(5).max(32),
  phone:Joi.string().regex(/^[0-9]{9}$/).required(),
  post_image: Joi.string().required().regex(/((jpe?g|webp|gif|png))$/),
  size:Joi.number().max(2*1024*1024)
});
export const PostUpdateSchema = Joi.object({
  postId:Joi.number().required().min(1),
  status:Joi.string().min(6).max(6)
});

