import jwt from '../utils/jwt.js'

export default (req,res,next) => {
  try {
    const {token} = req.headers
    if(!token){
      throw new Error('token required')
    }   
    const {userId} = jwt.verify(token)
    req.userId = userId
    next()
  } catch (error) {
    return next(error)
  }
}