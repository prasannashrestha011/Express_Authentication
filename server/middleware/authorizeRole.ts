import jwt, { VerifyErrors } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

const jwtSecret=process.env.JWT_SECRET

export  function authorizeRole(requiredRole:string){
     return (req:Request,res:Response,next:NextFunction)=>{
        if(!jwtSecret){
            res.status(500).json({"err":"failed to validate the login state"})
            return
        }
        const token=req.cookies.jwt
        if(!token){
            res.status(401).json({"err":"token not found"})
            return 
        }
         jwt.verify(token,jwtSecret,(err:VerifyErrors | null,decoded:jwt.JwtPayload|string|undefined)=>{
            //error handling 
            if(err){
                if(err.name="TokenExpiredError"){
                    res.status(401).json({"err":"token expired,please login again"})
                    return
                }
                console.log(err.message)
                res.status(403).json({err:err.message})
                return 
            }

            const {roles}=decoded as {roles?:string[]}
            console.log(roles)
            if(roles?.includes(requiredRole)){
                console.log("role authorized")
                next()

            }else{
                res.status(401).json({"err":"invalid role"})
                return
            }
        })
    }
}