const router = require('express').Router();
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');
const reactionRoutes = require('./reactionsRoutes');
const thoughtRoutes = require('./thoughtsRoutes')

router.use('/friends', friendRoutes);
router.use('/users', userRoutes);
router.use('./reactions', reactionRoutes);
router.use('./thoughts', thoughtRoutes);

module.exports = router;
