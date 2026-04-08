const prisma= require('../config/prisma');
const { getIO } = require('../socket');

const createWorkspace=async (req,res)=>{
    try{
    const ownerId=req.user.userId;
    const{name} = req.body;
    const workspace= await prisma.workspace.create({
        data:{
            name,
            ownerId,
        },
    });
    await prisma.workspaceMember.create({
        data:{
            userId:ownerId,
            workspaceId:workspace.id,
            role:"ADMIN",
        },
    });
    res.status(201).json({message:"Workspace created successfully",workspace});
} catch(error){
    res.status(500).json({error:error.message});
}

};
const getWorkspaces= async (req,res)=>{
    try{
        const userId=req.user.userId;
        const workspaces=await prisma.workspace.findMany({
            where:{
                OR:[
                    {ownerId:userId},
                    {
                        members:{
                            some:{
                                userId,
                            },
                        },
                    },
                ],
            },
            include:{
                members:{
                    where:{userId},
                    select:{role:true},
                },
            },
        });
        res.status(200).json({message:"Workspaces retrived successfully",workspaces});
    }catch(error){
        res.status(500).json({error:error.message});
    }

};
const addMember=async(req,res)=>{
    try{
        const {email}=req.body;
        const {workspaceId}=req.params;
        const user= await prisma.user.findUnique({
            where:{email},
        });
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        const member=await prisma.workspaceMember.create({
            data:{
                userId:user.id,
                workspaceId,
            },
        });
        getIO().emit("notification",{
            message:`${user.name} added to workspace`,
        })
        res.status(201).json(member);
    }catch(error){
        res.status(500).json({error:error.message});
    }

};
const getActivity=async(req,res)=>{
    try{
        const {workspaceId}=req.params;
        const activities= await prisma.activity.findMany({
            where:{workspaceId},
            orderBy:{createdAt:"desc"},
            include:{
                user:{
                    select:{name:true},
                },   
            },
        });
        res.json({message:"activities fetched",activities})
    }catch(error){
        res.status(500).json({error:error.message});
    }

};

module.exports= {createWorkspace,getWorkspaces,addMember,getActivity};