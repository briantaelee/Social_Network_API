const User = require('../models/User');

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getSingleUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId)
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.remove();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = userController;
