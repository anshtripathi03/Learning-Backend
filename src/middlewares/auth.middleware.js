import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from '../utils/asyncHandler.js'
import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js"

export const verifyJWT = asyncHandler(async(req, _, next)=>{
    try {
        
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new ApiError(401, "Unauthorised Request");
        }

        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const userId = verifiedToken?.id || verifiedToken?._id

        const user = await User.findById(userId).select("-password -refreshToken");

        if(!user){
            throw new ApiError(401, "Invalid access token could'nt find the user");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token") 
    }
})