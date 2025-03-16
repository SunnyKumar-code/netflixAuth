const users = require("../models/userModels")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config()
const authMiddleware=async(req,res,next)=>{

    try{
        
        let token = req.headers.authorization || "";
        token = token.split(" ")[1]
       // console.log(token);
        //res.cookies // to get Cookies from the request
        if (!token) {
            return res.status(401)
                .json({
                    success: false,
                    massage: "Unauthorized"
                })
        }
        /**
         * 1. Validate Token 
         */
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
       // console.log(tokenData);
    
        const user = await UserModel.findById(tokenData._id)
        //console.log(user);
        
        if (!user) {
            return res.status(401)
                .json({
                    success: false,
                    massage: "Unauthorized"
                })
        }
        req.user = user
        next()
    }catch(err){
        return res.status(401)
        .json({
            success: false,
            massage: "Unauthorized"
        })
    }
};

module.exports=authMiddleware