import { NextFunction, Request, Response } from "express";

export async function Content(req:Request,res:Response,next:NextFunction){
    try{
        res.status(200).json({"message":"You got jwt token!!!"})
    }catch(err){
        next()
    }
}