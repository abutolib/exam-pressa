import { env } from '../config.js'
export default (err, req, res, next) => {
  if (err.status != 500) {
    return res.status(400).json(err)
  }

  if (env === "development") {
    res.status(500).json(err)
  }

  err.message = "InternalServerError";
  return res.status(500).json(err)


}