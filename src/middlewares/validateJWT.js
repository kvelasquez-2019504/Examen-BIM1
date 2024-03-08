import jwt from 'jsonwebtoken'
import User from '../users/user.model.js'

export const validateJWT = async (req, res, next) => {
    const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    if(!user){
      return res.status(401).json({
        msg: 'The user does not exist in the database.'
      })
    }

    if(!user.state){
      return res.status(401).json({
        msg: 'The user is not enabled'
      })
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error),
      res.status(401).json({
        msg: "Invalid token",
      });
  }
}