const User = require('../models/User');

const friendController = {
  addFriend: async (req, res) => {
    const { userId, friendId } = req.params;

    try {
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ error: 'User or friend not found' });
      }

      user.friends.push(friendId);
      await user.save();

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removeFriend: async (req, res) => {
    const { userId, friendId } = req.params;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const friendIndex = user.friends.indexOf(friendId);

      if (friendIndex === -1) {
        return res.status(404).json({ error: 'Friend not found in the user\'s friend list' });
      }

      user.friends.splice(friendIndex, 1);
      await user.save();

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = friendController;
