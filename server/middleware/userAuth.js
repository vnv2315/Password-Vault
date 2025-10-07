import jwt from 'jsonwebtoken'

const authUser=async(req,res,next)=>{
    try {
        const {token}=req.headers;
        if(!token){
            return res.status(401).json({success:false,message:"Unauthorized access"})
        }
        const decode=jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decode.id };
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
    }
}

export default authUser;