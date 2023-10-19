const router = require('express').Router();
const {
  addFriend,
  removeFriend,
} = require('../../controllers/friendController');

router.post('/:userId/friends/:friendId', addFriend);

router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;
