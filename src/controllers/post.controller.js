import { queryAdd, read, write } from "../utils/model.js";
import jwt from "../utils/jwt.js";
import { BadRequestError, InternalServerError } from "../utils/errors.js";
import { resolve } from 'path'

export const GET = (req, res, next) => {
  const posts = read("posts");
  const organizers = read("organizers");
  const subcategories = read("subcategories");
  const categories = read("categories");
  try {

    const { page } = req.query

    const filteredArray = posts.filter(post => post.status == "active")


    if (filteredArray.length) {
      filteredArray.map(post => {
        post.organizer = organizers.find(organizer => organizer.organizerId = post.organizerId)
        post.subcategory = subcategories.find(subcategory => subcategory.subcategoryId = post.subcategoryId)
        post.category = categories.find(category => category.categoryId = post.categoryId)

        //delete post.organizerId;
        //delete post.subcategoryId;
        delete post.categoryId;
      })
    }


    function pagination(data, pageNumber, limit) {
      let films = data.slice((pageNumber - 1) * limit, limit * pageNumber)
      return films
    }
    let result = pagination(filteredArray.reverse(), page, 9)
    console.log(result);

    delete req.query.page
    delete req.query.limit

    result = queryAdd(req.query, result)

    res.status(200).json({
      status: 200,
      message: 'success',
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
    const organizers = read('organizers')
    const subcategories = read('subcategories')
    const post = posts.find(item => item.postId == postId)
    if (!post) {
      throw new Error("This post not found ")
    }

    post.views = post.views + 1;
    write("posts", posts)
    post.organizer = organizers.find(organizer => organizer.organizerId == post.organizerId)
    post.subcategories = subcategories.find(subcategory => subcategory.subcategoryId == post.subcategoryId)
    delete post.organizerId
    res.status(200).send(post)
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
};

export const POST = (req, res, next) => {
  const posts = read("posts");
  const organizers = read("organizers");
  const subcategories = read('subcategories')
  const categories = read("categories");
  const { start_date, start_time, categoryId, subcategoryId, type, link, full_name, phone, job, post_title, post_body } = req.body;

  const { post_image } = req.files
  try {

    const filePath = Date.now() + post_image.name.replace(/\s/g, '')
    const findedPost = posts.find(post => post.start_date == start_date && post.start_time == start_time && post.link == link && post.post_body == post_body &&
      post.post_title == post_title)

    if (findedPost) {
      throw new Error("This post already exist")
    }
    const newPost = {
      postId: posts.at(-1).postId + 1 || 1,
      start_date: start_date,
      start_time: start_time,
      categoryId: categoryId,
      subcategoryId: subcategoryId,
      type: type,
      link: link,
      post_image: filePath,
      post_title: post_title,
      post_body: post_body,
      views: 0,
      status: "noactive"
    }

    post_image.mv(resolve('uploads', filePath))

    const findedOrganizer = organizers.find(organizer => organizer.full_name == full_name && organizer.job == job && organizer.phone == phone)
    if (!findedOrganizer) {
      var newOrganizer = {
        organizerId: organizers.at(-1).organizerId + 1 || 1,
        full_name: full_name,
        job: job,
        phone: phone
      }
      organizers.push(newOrganizer)
      write('organizers', organizers)
    }

    newPost.organizerId = newOrganizer?.organizerId || findedOrganizer.organizerId



    posts.push(newPost)
    write('posts', posts)


    newPost.category = categories.find(category => category.categoryId == newPost.categoryId)
    newPost.organizer = organizers.find(organizer =>organizer.organizerId == newPost.organizerId)
    newPost.subcategory = subcategories.find(subcategory => subcategory.subcategoryId == newPost.subcategoryId)

    delete newPost.categoryId;
    delete newPost.organizerId;
    delete newPost.subcategoryId;

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
  //GET_BY_DATE,
  // GET_BY_SUBCATEGORY,
  // GET_BY_TYPE,
  // GET_BY_FULL_NAME,
  POST
}