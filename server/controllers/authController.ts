import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import { CreateUser } from "../repository/userRepository";

export async function registerNewUser(req:Request<{},{},{userDetails:CreateUserDto}>,res:Response){
    try{
        const userDetails=req.body.userDetails
        if(!userDetails){
            res.status(400).json({err:"Insufficent details"})
            return 
        }
        const isAccountCreated=await CreateUser(userDetails)
        if(!isAccountCreated){
            res.status(400).json({message:"failed to create the account"})
            return 
        }
        res.status(200).json({"message":"Account created"})
    }catch(err){
        console.error(err)
    }
}