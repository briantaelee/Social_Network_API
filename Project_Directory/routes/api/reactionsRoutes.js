const router = require('express').Router();
const {
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

router.post('/:thoughtId/reactions', createReaction);

router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
