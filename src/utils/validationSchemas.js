import Joi from "joi";


export const AdminLoginSchema = Joi.object({
  adminLogin: Joi.string().required().min(8).max(32).regex(/([a-z])\w+/),
  password: Joi.string().required().min(8).max(24),
});

export const PosterCreateSchema = Joi.object({
  start_date: Joi.string()
    .required()
    //.regex(/^(?:\d{2})-(?:\d{2})-(?:\d{4})\/(?:\d{2}):(?:\d{2})$/), //22-01-2022/14:00 => dd-mm-yyyy/hh:mm
    .regex(/^(?:\d{4})-(?:\d{2})-(?:\d{2})$/), //22-01-2022/14:00 => dd-mm-yyyy/hh:mm
  start_time:Joi.string().required().regex(/(?:\d{2}):(?:\d{2})$/),
  //subcategoryId: Joi.number().required(),
  type: Joi.string().required().min(6).max(7), // onlin - offline
  link: Joi.string().required().min(8).max(64),
  post_title: Joi.string().required().min(15).max(64),
  post_body: Joi.string().required().min(32).max(260),
  organizerId: Joi.number().required(),
  post_image: Joi.string().required().regex(/((jpe?g|png|gif|webp))$/), // .jpg .jpeg .png .gif .webp
  size:Joi.number().max(2*1024*1024)
});
//start_date, start_time, categoryId, subcategoryId, type, link,full_name,number,job,post_title,post_body
