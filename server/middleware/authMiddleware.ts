import { NextFunction, Request, Response } from "express";
import { validateJwt } from "../utils/hashing/jwt/jwt";

export async function authMiddleware(req:Request,res:Response,next:NextFunction){
    const jwtToken=req.cookies.jwt;
 
  try{
    if(!jwtToken){
        res.status(401).json({"err":"request unauthorized, please signIn "})
        return 
    }
    const {username,roles}=await validateJwt(jwtToken)
    if(!username || !roles){
      res.status(401).json({"err":"session expired"})
      return 
    }
    next()
  }catch(err){
    console.log(err)
    res.status(500).json({"err":"Internal server error"})
    return
  }
}