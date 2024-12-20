
import jwt from 'jsonwebtoken'

const jwtSecret=process.env.JWT_SECRET
export async function generateJwt(username:string,roles:string[]):Promise<string>{
    if(!jwtSecret){
        return "Jwt secret not provided"
     }
     const payload={
        username,
        roles 
     }
     
     
     return new Promise((resolve,rejects)=>{
        jwt.sign(
            payload,
            jwtSecret,
            {expiresIn:'1h'},
            (err,token)=>{
                if(err ||!token){
                    rejects(err || new Error("Token generation failed"))
                    return 
                }
                resolve(token)
            }
        )
     })
}
export async function validateJwt(jwtToken:string):Promise<{username:string,roles:string[]}>{
    if(!jwtToken || !jwtSecret){
            throw new Error("failed to decode the token")
    }
 return new Promise((resolve,reject)=>{
    jwt.verify(jwtToken,jwtSecret,(err,decoded)=>{
       if(err){
        if(err.name="TokenExpiredError"){
            console.log("token expired")
            return 
        }
        reject(err)
       }
       console.log(decoded)
       resolve(decoded as {username:string;roles:string[]})
    })
 })
}
   