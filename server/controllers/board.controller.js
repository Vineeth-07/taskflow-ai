const prisma = require('../config/prisma');

const createBoard= async(req,res)=>{
    try{
        const {name} = req.body;
        const {workspaceId} = req.params;
        const board= await prisma.board.create({
            data:{
                name,
                workspaceId,
            },
        });

        res.status(201).json({message:"Board created successfully",board});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const getBoards= async(req,res)=>{
    try{
        const {workspaceId} = req.params;
        if(!workspaceId){
            return res.status(400).json({message:"Workspace Id required"});
        }
        const boards = await prisma.board.findMany({
            where:{workspaceId},
        });

        res.status(200).json({message:"Boards retrived successfully",boards});
    } catch(error){
        res.status(500).json({error:error.message});
    }
};
const getMembers=async(req,res)=>{
    try{
        const {workspaceId}=req.params;
        if(!workspaceId){
            return res.status(400).json({message:"Workspace Id not found"})
        }
        const members= await prisma.workspaceMember.findMany({
            where:{
                workspaceId,
            },
            include:{
                user:{
                select:{
                    id:true,name:true, email:true,
                },
            },
            },
        });
        res.status(200).json({message:"members accquired",members});
    }catch(error){
        res.status(500).json({error:error.message});
    }

};

module.exports ={createBoard,getBoards,getMembers};