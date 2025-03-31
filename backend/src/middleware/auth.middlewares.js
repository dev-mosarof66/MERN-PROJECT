import jwt from "jsonwebtoken";

const auth = async(req,res,next) => {
  try {
    
    const token = req.cookies.token;
    // console.log(`token in auth : ${token}`);
    
    if(!token){
        return res.status(401).json({message:"user not authenticated"})
    };
    const decode =  jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decode){
        return res.status(401).json({message:"login session expired"});
    };
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
