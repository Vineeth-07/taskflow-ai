const prisma = require("../config/prisma");
const getUserDetails=async(req,res)=>{
    try{
        const {userId}= req.user;
        const user= await prisma.user.findUnique({
            where:{id:userId},
            select:{id:true,name:true,email:true}
        });
        res.status(200).json({message:"User details fetched successfully",user});
    }catch(error){
        res.status(500).json({error:error.message});
    }

};
const updateUserDetails=async(req,res)=>{
    try{
        const {userId}=req.user;
        const {updatedName}=req.body;
        const updatedUser= await prisma.user.update({
            data:{name:updatedName},
            where:{id:userId},
            select:{id:true,name:true,email:true},
        });
        res.status(201).json({message:"user name updated",updatedUser});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
module.exports={getUserDetails,updateUserDetails}