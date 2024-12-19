import argon from 'argon2'
export async function hashPassword(plainPassword:string):Promise<string>{
    return argon.hash(plainPassword)
}   
export async function comparePassword(storedPassword:string,plainPassword:string):Promise<boolean>{
    return argon.verify(storedPassword,plainPassword)
}