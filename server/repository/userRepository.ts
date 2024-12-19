import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UserDto } from "../dtos/user.dto";
import { hashPassword } from "../utils/hashing/hash";

const prisma=new PrismaClient()

export async function CreateUser(userDetails:CreateUserDto):Promise<boolean>{
    try{
        const {email,username,password,fullname,roleIds}=userDetails
        console.log(roleIds)
        const hashedPassword=await hashPassword(password)
        await prisma.user_model.create({
            data:{
                email,
                username,
                password:hashedPassword,
                fullname,
                roles:{
                    connect:roleIds.map(roleId=>({roleId}))
                }
            }
        })
       return true
    }catch(err){
        console.error(err)
        return false
    }
}
export async function GetUserDetails(username:string):Promise<UserDto | null>{
    try{
        const userDetails=await prisma.user_model.findUnique({
            where:{
                username,
            },
            include:{
                roles:true
            }
        })
        if(!userDetails){
            console.log("user not found!!")
            return null
        }
        return userDetails as UserDto
    }catch(err){
        console.error(err)
        return null
    }
}