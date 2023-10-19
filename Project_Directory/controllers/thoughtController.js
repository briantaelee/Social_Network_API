const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getThoughtById: async (req, res) => {
    const { thoughtId } = req.params;

    try {
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createThought: async (req, res) => {
    const { userId, thoughtText, username } = req.body;

    try {
      const thought = await Thought.create({ thoughtText, username, userId });
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.thoughts.push(thought._id);
      await user.save();

      res.status(201).json(thought);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  updateThought: async (req, res) => {
    const { thoughtId } = req.params;

    try {
      const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });

      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  deleteThought: async (req, res) => {
    const { thoughtId } = req.params;

    try {
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      await thought.remove();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = thoughtController;
