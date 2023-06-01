import { read, write } from "../utils/model.js";
import jwt from "../utils/jwt.js";
import { BadRequestError, InternalServerError } from "../utils/errors.js";
import {resolve} from 'path'

export const GET = (req, res, next) => {
  const posts = read("posts");
  const organizers = read("organizers");
  try {

    const {page} = req.query

    const filteredArray = posts.filter(post => post.status == "active")

    if (filteredArray.length) {
      filteredArray.map(post => {
        post.organizer = organizers.find(organizer => organizer.organizerId = post.organizerId)
        delete post.organizerId;
      })
    }


    function pagination(data, pageNumber, limit) {
      let films = data.slice(0, limit * pageNumber)
      return films
    }

    const result = pagination(filteredArray.reverse(),page,9)

    res.status(200).json({
      status:200,
      message:'success',
      data: result
    })
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
};
export const GET_BY_ID = (req, res, next) => {
  try {
    const { postId } = req.params
    const posts = read('posts')
    const post = posts.find(item => item.postId == postId)
    if (!post) {
      throw new Error("This post not found ")
    }
    post.views = post.views + 1;
    write("posts", posts)
    res.status(200).send(post)
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
};



export const POST = (req, res, next) => {
  const posts = read("posts");
  const organizers = read("organizers");
  const { start_date, start_time, categoryId, subcategoryId, type, link,full_name,phone,job,post_title,post_body} = req.body;
  const {post_image} = req.files
  try {

    const filePath = Date.now() + post_image.name.replace(/\s/g, '')

    const findedPost = posts.find(post =>
     { post.start_date == start_date &&
      post.start_time == start_time &&
      post.type == type &&
      post.categoryId == categoryId &&
      post.subcategoryId == subcategoryId &&
      post.link == link})

    if (findedPost) {
      throw new Error("This post already exist")
    }
    const newPost = {
      postId:posts.at(-1).postId + 1|| 1,
      start_date:start_date,
      start_time:start_time,
      subcategoryId:subcategoryId, 
      type:type, 
      link:link,
      post_image:filePath,
      post_title:post_title,
      post_body:post_body,
      views:0,
      status:"noactive"
    }

    post_image.mv(resolve('uploads', filePath))

    const findedOrganizer = organizers.find(organizer => organizer.full_name == full_name && organizer.job == job && organizer.phone == phone)
    if(!findedOrganizer){
      var newOrganizer = {
        organizerId : organizers.at(-1).organizerId + 1 || 1,
        full_name:full_name,
        job:job,
        phone:phone
      }
      console.log(newOrganizer);
      organizers.push(newOrganizer)
      write('organizers',organizers)
    }

    newPost.organizerId = newOrganizer?.organizerId || findedOrganizer.organizerId

    posts.push(newPost)
    write('posts',posts)
    res.status(201).json({
      status: 201,
      message: 'success',
      data: newPost
    })
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
};

export default {
  GET,
  GET_BY_ID,
  POST
}