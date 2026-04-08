const express= require('express');
const router= express.Router();

const {
    createTask, getTasks, updateTaskStatus, 
    getBoardById,createAttachments, assignTask,summarize}= require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { upload } = require('../middleware/upload.middleware');

router.post('/:boardId/tasks',authMiddleware,createTask);
router.get('/:boardId/tasks',authMiddleware, getTasks);
router.patch('/tasks/:taskId/status',authMiddleware,updateTaskStatus);
router.patch('/tasks/:taskId/assign',authMiddleware,assignTask)
router.get('/:boardId',authMiddleware,getBoardById);
router.post('/tasks/:taskId/attachments',
    authMiddleware,upload.single("file"),createAttachments);
router.post('/tasks/ai/summarize',authMiddleware,summarize)

module.exports = router;