import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../dtos/user.dto";
import { hashPassword } from "../utils/hashing/hash";

const prisma=new PrismaClient()

export async function CreateUser(userDetails:CreateUserDto):Promise<boolean>{
    try{
        const {email,username,password,fullname}=userDetails
        const hashedPassword=await hashPassword(password)
        await prisma.userModel.create({
            data:{
                email,
                username,
                password:hashedPassword,
                fullname
            }
        })
       return true
    }catch(err){
        console.error(err)
        return false
    }
}