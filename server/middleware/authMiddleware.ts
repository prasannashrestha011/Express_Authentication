import { NextFunction, Request, Response } from "express";

export async function authMiddleware(req:Request,res:Response,next:NextFunction){
    const jwtToken=req.cookies.jwt;
 
  try{
    if(!jwtToken){
        res.status(401).json({"err":"request unauthorized, please signIn "})
        return 
    }
    console.log(jwtToken)
    next()
  }catch(err){
    console.log(err)
    res.status(500).json({"err":"Internal server error"})
    return
  }
}