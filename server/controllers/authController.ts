import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import { CreateUser, GetUserDetails, UpdatePassword } from "../repository/userRepository";
import { comparePassword, hashPassword } from "../utils/hashing/hash";
import { generateJwt } from "../utils/hashing/jwt/jwt";

export async function registerNewUser(req:Request<{},{},{userDetails:CreateUserDto}>,res:Response,next:NextFunction){
    try{
        const userDetails=req.body.userDetails

        console.log(userDetails)
        if(!userDetails){
            res.status(400).json({err:"Insufficent details"})
            return 
        }
        const isAccountCreated=await CreateUser(userDetails)
        if(!isAccountCreated){
            res.status(400).json({message:"failed to create the account"})
            return 
        }
        console.log("New user created")
        res.status(200).json({"message":"Account created"})
    }catch(err){
        next()
    }
}
export async function authenticateUser(req:Request<{},{},{username:string,password:string}>
    ,res:Response,
    next:NextFunction
){
    try{
        const {username,password}=req.body
        if(!username || !password){
            res.status(400).json({err:"insufficent credentials"})
            return 
        }
        const foundUser=await GetUserDetails(username)
    
        if(!foundUser){
            res.status(404).json({"err":"user not found!!!"})
            return 
        }
        const isVerified=await comparePassword(foundUser.password,password) //stored & plain pass
        if(!isVerified){
            res.status(401).json({"err":"incorrect password"})
            return 
        }
        const userRoles=foundUser.roles.map(role=>role.roleName)
        const jwtToken=await generateJwt(username,userRoles)
        res.status(200).cookie('jwt',jwtToken,{
            httpOnly:true,
            maxAge:360000,
            sameSite:'lax'
        }).json(foundUser)
    }catch(err){
        next()
    }
}
export async function changePassword(req:Request<{},{},{username:string,password:string,newPassword:string}>,res:Response,next:NextFunction){
    try{
        const {username,password,newPassword}=req.body
        if(!username || !password || !newPassword){
            res.status(400).json({"err":"insufficent credentials"})
            return 
        }
        const userDetails=await GetUserDetails(username)
        if(!userDetails){
            res.status(404).json({"err":"user not found"})
            return 
        }
        const isAuthenticated=comparePassword(userDetails.password,password)
        if(!isAuthenticated){
            res.status(401);
            return 
        }
        const hashedPassword=await hashPassword(newPassword)
       const isPassUpdated= await UpdatePassword(username,hashedPassword)
       if(!isPassUpdated){
        res.status(403).json({err:"failed to update the password"})
        return 
        }
        res.status(200).json({message:"Your password has been changed"})
        
    }catch(err){
        console.log(err)
        res.status(500).json({"err":"Unknow error occured"})
        return 
    }
}