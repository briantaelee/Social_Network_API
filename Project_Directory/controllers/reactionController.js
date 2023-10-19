const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction'); 

const reactionController = {
  createReaction: async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    try {
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      const newReaction = new Reaction({ reactionBody, username });
      thought.reactions.push(newReaction);
      await thought.save();

      res.status(201).json(newReaction);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  deleteReaction: async (req, res) => {
    const { thoughtId, reactionId } = req.params;

    try {
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }

      const reaction = thought.reactions.id(reactionId);

      if (!reaction) {
        return res.status(404).json({ error: 'Reaction not found' });
      }

      reaction.remove();
      await thought.save();

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = reactionController;
