import { hashPassword, read } from "../utils/model.js";
import jwt from "../utils/jwt.js";
import { BadRequestError, InternalServerError } from "../utils/errors.js";

export const LOGIN = (req, res, next) => {
  const admins = read("admins");
  console.log(admins);
  let { adminLogin, password } = req.body;
  try {
    password= hashPassword(password)
    console.log(password);
    const admin = admins.find(
      (admin) => admin.adminLogin == adminLogin && admin.password == password
    );

    if (!admin) next(new BadRequestError(400, "Invalid username or passord"));
    delete admin.password;
    res.status(200).json({
      status: 200,
      message: "success",
      access_token: jwt.sign({ adminId: admin.adminId }),
      data: admin,
    });
  } catch (error) {
    next(new InternalServerError(500, error.message))
  }
};

export default {
  LOGIN
}