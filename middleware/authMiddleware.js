import jwt from 'jsonwebtoken'

import User from "../models/User.js";
import Role from "../models/Role.js";
import Permission from "../models/Permission.js";

const protect = async (
  req,
  res,
  next
) => {

  let token

  if (

    req.headers.authorization &&

    req.headers.authorization.startsWith(
      'Bearer'
    )

  ) {

    try {

      token =
        req.headers.authorization.split(
          ' '
        )[1]

      const decoded = jwt.verify(

        token,

        process.env.JWT_SECRET

      )

      // const user =
      //   await User.findById(
      //     decoded.id
      //   ).select('-password')
const user = await User.findById(decoded.id)
.populate({
    path:"role",
    populate:{
        path:"permissions"
    }
})
.select("-password");
       
      if (!user) {

        return res.status(401).json({

          message:
            'User Not Found'

        })
      }

      req.user = user

      next()

    } catch (error) {
  console.error(error);
  console.error(error.message);
  return res.status(401).json({
    success: false,
    message: error.message,
  });
}

  } else {

    return res.status(401).json({

      message:
        'No Token'

    })
  }
}

export default protect