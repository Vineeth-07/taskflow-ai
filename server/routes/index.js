const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const workspaceRoutes = require('./workspace.routes');
const boardRoutes = require('./board.routes');
const taskroutes = require('./task.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/user',userRoutes)
router.use('/workspaces', workspaceRoutes);
router.use('/workspaces', boardRoutes);
router.use('/boards',taskroutes);

module.exports = router;