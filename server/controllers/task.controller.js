const prisma = require('../config/prisma');
const { upload } = require('../middleware/upload.middleware');
const { getIO } = require('../socket');
const logActivity = require('../utils/activity');
const { summarizeTask } = require('../utils/ai');

const createTask = async(req,res)=>{
    try{
        const {boardId} = req.params;
        const userId=req.user.userId;
        const {title,description, status,assignedToId,workSpaceId} = req.body;
        const task= await prisma.task.create({
            data:{
                title,
                description,
                boardId,
                assignedToId,
            },
        });
        const user=await prisma.user.findUnique({
            where:{id:userId},
        });
        const board = await prisma.board.findUnique({
             where: { id: boardId },
            select: { name: true},
    });
        await logActivity({
            message:`${user.name} created task ${title} in ${board.name}`,
            userId,
            workspaceId:workSpaceId,
        });
        getIO().emit("notification",{
            message:`${user.name} created task ${title} in ${board.name}`,
        });
        res.status(201).json({message:"task created successfully",task});
    } catch(error){
        res.status(500).json({error:error.message});
    }
};

const getTasks = async(req,res)=>{
    try{
        const{boardId}=req.params;
        const tasks = await prisma.task.findMany({
            where:{boardId},
            include:{
                assignedTo:{
                    select:{id:true,name:true},
                },
                attachments:{
                    select:{id:true , url:true},
                },
            },
        });
        res.status(200).json({message:"Tasks retrived successfully",tasks});
    } catch(error){
        res.status(500).json({error:error.message});
    }
};


const updateTaskStatus = async(req,res)=>{
    try{
    const {taskId}=req.params;
    const {status, workSpaceId,boardId}=req.body;
    const updatedTask= await prisma.task.update({
        where:{id: taskId},
        data:{ status },
    });
    const board = await prisma.board.findUnique({
             where: { id: boardId },
            select: { name: true},
    });
    await logActivity({
        message: `Moved task  ${updatedTask.title} to ${status} in ${board.name}`,
        userId: req.user.userId,
        workspaceId:workSpaceId,
    });
    getIO().emit("notification",{
        message:`Moved task  ${updatedTask.title} to ${status} in ${board.name}`,
    });
    res.status(200).json({message:"status updated",updatedTask});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
};

const assignTask = async (req, res) => {
  const { taskId } = req.params;
  const { assignedToId } = req.body;

  const task = await prisma.task.update({
    where: { id: taskId },
    data: { assignedToId },
    include: {
    assignedTo: true, 
    attachments: true,
  },
  });

  getIO().emit("notification",{
    message:`Task assigned to ${task.assignedTo.name}`,
  });

  res.json(task);
};

const getBoardById= async(req,res)=>{
    try{
        const {boardId}=req.params;
        const board= await prisma.board.findUnique({
            where:{id: boardId},
    });
    res.json({message:"board details retrived successfully",board});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};


const createAttachments=async(req,res)=>{
    try{
        const {taskId}=req.params;
        const attachment=await prisma.attachment.create({
            data:{
                url:req.file.path,
                taskId,
            },
        });
        res.json({attachment});

    }catch(error){
        res.status(500).json({error:error.message})
    }
};

const summarize=async(req,res)=>{
 try {
    const { text } = req.body;

    const summary = await summarizeTask(text);

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports ={createTask,getTasks,updateTaskStatus, getBoardById,
    createAttachments,assignTask,summarize};