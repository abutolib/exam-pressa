import { read, write } from "../utils/model.js";
import jwt from "../utils/jwt.js";
import { BadRequestError, InternalServerError } from "../utils/errors.js";
import {resolve} from 'path'

export const GET = (req, res, next) => {
  const posts = read("posts");
  const organizers = read("organizer");
  try {
    const filteredArray = posts.filter(post => post.status == "active")

    if (filteredArray.length) {
      filteredArray.map(post => {
        post.organizer = organizers.find(organizer => organizer.organizerId = post.organizerId)
        delete post.organizerId;
      })
    }

    res.status(200).json({
      data: filteredArray
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
  console.log('sasas');
  const posts = read("posts");
  const organizers = read("organizer");
  const { start_date, start_time, categoryId, subcategoryId, type, link,full_name,number,job } = req.body;
  const {post_image} = req.files
  console.log(req.body);
  try {

    const filePath = Date.now() + post_image.name.replace(/\s/g, '')

    const findedPost = posts.find(post =>
     { post.start_date == start_date &&
      post.start_time == start_time &&
      post.type == type &&
      post.categoryId == categoryId &&
      post.subcategoryId == subcategoryId &&
      post.link == link})
    console.log(findedPost);
    if (findedPost) {
      throw new Error("This post already exist")
    }
    const newPost = {
      postId:posts.at(-1).postId + 1|| 1,
      start_date:start_date,
      start_time:start_time, 
      categoryId:categoryId,
      subcategoryId:subcategoryId, 
      type:type, 
      link:link,
      post_image:filePath
    }

    console.log(newPost);

    post_image.mv(resolve('uploads', filePath))

    const findedOrganizer = organizers.find(organizer => organizer.full_name == full_name && organizer.job == job && organizer.number == number)
    if(!findedOrganizer){
      const newOrganizer = {
        organizerId : organizers.at(-1).organizerId + 1 || 1,
        full_name:full_name,
        job:job,
        number:number
      }
      organizers.push(newOrganizer)
      write('organizers',organizers)
    }
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