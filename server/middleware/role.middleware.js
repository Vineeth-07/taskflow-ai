const prisma=require("../config/prisma");

const isAdmin=async(req, res, next)=>{
    try{
        const userId= req.user.userId;
        const{workspaceId}= req.params;
        const member= await prisma.workspaceMember.findFirst({
            where:{
                userId,
                workspaceId,
            },
        });
        if(member && member.role==="Member"){
            return res.status(403).json({message:"Access Denied"});
        }
        next();
        
    }catch(error){
        res.status(500).json({error:error.message});
    }

};
module.exports={isAdmin};