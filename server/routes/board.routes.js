const express= require('express');
const router = express.Router();

const {createBoard, getBoards} = require('../controllers/board.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/role.middleware');

router.post('/:workspaceId/boards',authMiddleware, createBoard); 
router.get('/:workspaceId/boards',authMiddleware,getBoards); //requires id to send in params

module.exports = router;