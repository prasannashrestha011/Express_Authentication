
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