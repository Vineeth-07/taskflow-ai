const prisma= require('../config/prisma');
const logActivity = async({message,userId, workspaceId})=>{
    try{
        await prisma.activity.create({
            data:{
                message,
                userId,
                workspaceId,
            },
        });
        console.log(message);
    }catch(error){
        console.log("activity error",error.message);
    }
};
module.exports = logActivity;