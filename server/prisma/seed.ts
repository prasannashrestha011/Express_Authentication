import {PrismaClient} from '@prisma/client'

const roles=['ADMIN','USER']
const prisma=new PrismaClient()
async function Seeds(){
   for(const role of roles){
    await prisma.role.create({
        data:{
            roleName:role
        }
    })
   }  
}
Seeds().catch(err=>{
    console.error(err)
    process.exit(1)
}).finally(async()=>{
       await  prisma.$disconnect()
})