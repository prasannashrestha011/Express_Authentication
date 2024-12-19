export interface CreateUserDto{
    email:string
    username:string 
    password:string 
    fullname:string 
    roleIds:number[]
}
export interface UserDto{
    userId:number
    email:string 
    username:string 
    password:string 
    fullname:string
    createdAt:Date 
    updatedAt:Date 
    roles:roleDto[]
}
interface roleDto{
    roleId:number 
    roleName:string
}
